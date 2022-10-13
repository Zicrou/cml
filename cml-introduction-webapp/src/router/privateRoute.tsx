import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import readLocalStorage from '../utils/readLocalStorage'
import { TokenAuthThunk, tokenAuthClear } from '../redux/actions/Auth/handleUnauthorizedRoutes'
import { RootState } from '../redux/reducers/index'

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)
Auth.configure(awsconfig)

export const ProtectedRoute: React.FC<{
  component: any | React.FC
  path: string
  exact: boolean
}> = ({ component: Component, ...rest }) => {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(TokenAuthThunk())
  }, [dispatch])
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === false) {
          return (
            <div style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
              <Loader />
            </div>
          )
        } else if (auth === 'failed') {
          Auth.signOut()
          dispatch(tokenAuthClear())
          localStorage.clear()
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          )
        } else if (readLocalStorage('access-token') === undefined) {
          Auth.signOut()
          dispatch(tokenAuthClear())
          localStorage.clear()
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          )
        } else {
          return <Component {...props} />
        }
      }}
    />
  )
}
