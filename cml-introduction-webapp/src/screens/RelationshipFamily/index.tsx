import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createRelationShipFamily } from '../../redux/actions/RelationshipFamily/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const RelationShipFamily: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const relationshipAnswers = props.location.state && props.location.state.relationshipAnswers
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const dispatch = useDispatch()
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const createRelationShipFamilyStatus = useSelector((state: RootState) => state.createRelationShipFamily)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const [loader, setLoader] = useState(false)
  const [back, setBack] = useState<any>()

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = relationshipAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 8
      )
      dispatch(
        updateAnswer({
          id: currentAnswer[0].sys.id,
          type: 'string',
          response: formDataObj.comment,
          sortId: '1'
        })
      )
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptiveAnswer(e.currentTarget.value)
  }

  useEffect(() => {
    dispatch(getAnswerBack('relationship-family'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (questionId) {
      const answers = relationshipAnswers.filter((answer: { questionId: number }) => answer.questionId === 8)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, relationshipAnswers])

  useEffect(() => {
    if (createRelationShipFamilyStatus && createRelationShipFamilyStatus.status === 200) {
      setLoader(false)
      window.location.replace('/relationship-living')
    }
  }, [createRelationShipFamilyStatus, dispatch, history])

  const onSubmit = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())

    if (back != undefined && back != '') {
      setLoader(true)
      dispatch(
        updateAnswer({
          id: back[0].sys.id,
          type: 'string',
          response: formDataObj.comment,
          sortId: '1'
        })
      )
    } else {
      if (formDataObj.comment) {
        setLoader(true)
        dispatch(createRelationShipFamily({ sortId: '1', response: formDataObj.comment }))
      }
    }
  }

  useEffect(() => {
    if (getAnswerBackStatus && getAnswerBackStatus.status == 200) {
      setLoader(false)
      const answers = getAnswerBackStatus.data
      if (answers == '') {
        setDescriptiveAnswer('')
      }
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1) {
          setDescriptiveAnswer(answers[i].response)
        }
      }
      if (answers) {
        setBack(answers)
      }
    }
  }, [getAnswerBackStatus])

  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/relationship-living')
      }
      if (relationshipAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="14.28" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="immediate-family-cml-logo">
                    <Link title="Home" to="/home">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              ) : (
                <div className="cml-logo-title">
                  <div className="immediate-family-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="immediate-family-header-text">
                <div className="immediate-family-sub-heading-1">
                  <b>Relationship!</b>
                </div>
                <div className="immediate-family-sub-heading-2">
                  <p>Who do you consider your immediate family?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="immediate-family-section">
                  <div className="living-situation-items col-md-12">
                    <div className="immediate-family-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="immediate-family-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>

                  {loader ? (
                    <div className="immediate-family-continue-btn">
                      <Loader />
                    </div>
                  ) : (
                    <div className="immediate-family-continue-btn">
                      <a href="/end-of-life-style">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button>{questionId ? 'Update' : 'Continue'}</button>
                    </div>
                  )}
                </div>
              </Form>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(RelationShipFamily)
