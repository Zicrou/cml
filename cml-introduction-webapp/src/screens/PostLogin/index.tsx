import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { tokenAuthClear } from '../../redux/actions/Auth/handleUnauthorizedRoutes'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../../aws-exports'

import AWS from 'aws-sdk'
AWS.config.update({
  region: `${process.env.REACT_APP_AWS_REGION}`,
  accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`
})
import { getAnswers } from '../../redux/actions/answers/get'
import { RootState } from '../../redux/reducers/index'
import './style.css'

Amplify.configure(awsconfig)
Auth.configure(awsconfig)

const PostLogin: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch()
  const getAnswersStatus = useSelector((state: RootState) => state.getAnswers)
  const accessToken = localStorage.getItem('access-token')
  const attributeUpdate = async (event: any) => {
    try {
      // no callback here can be used in future
      dispatch(getAnswers())
    } catch (error) {
      Auth.signOut()
      dispatch(tokenAuthClear())
      localStorage.clear()
    }
  }
  const getToken = () => {
    if (accessToken) {
      dispatch(getAnswers())
    } else {
      return Auth.currentSession()
        .then((session: any) => {
          localStorage.setItem('access-token', session.accessToken.jwtToken)
          if (session.idToken.payload.email_verified === false) {
            const attributes = {
              UserAttributes: [
                {
                  Name: 'email_verified',
                  Value: 'true'
                }
              ],
              UserPoolId: `${process.env.REACT_APP_AWS_USER_POOL_ID}`,
              Username: session.idToken.payload['cognito:username']
            }
            attributeUpdate(attributes)
          } else {
            dispatch(getAnswers())
          }
        })
        .catch((err: any) => console.log(err))
    }
  }
  useEffect(() => {
    if (getAnswersStatus && getAnswersStatus.status === 401) {
      localStorage.clear()
      window.location.replace('/login')
    }
  }, [getAnswersStatus])

  useEffect(() => {
    getToken()
  }, [])
  useEffect(() => {
    const redirectURL = localStorage.getItem('redirectURL')
    if (getAnswersStatus && getAnswersStatus.data) {
      const items = getAnswersStatus.data.items
      let bookmark = 0
      if (items && items.length) {
        bookmark = Math.max(
          ...items.map(function (o: { questionId: any }) {
            return o.questionId
          })
        )
      }
      if (redirectURL) {
        history.push(redirectURL)
      } else if (bookmark === 22) {
        history.push('/home')
      } else if (items && items.length <= 0) {
        history.push('/welcome')
      } else if (items && items.length > 0) {
        history.push('/welcome-back')
      }
    }
  }, [getAnswersStatus, history])

  const url = window.location.search
  const urlParams = new URLSearchParams(url)
  const error = urlParams.get('error_description')

  if (error) {
    history.push('/login')
  }

  return (
    <>
      <Loader />
    </>
  )
}

export default withRouter(PostLogin)
