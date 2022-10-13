import React, { useEffect, useState } from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createLifeStyleHealth } from '../../redux/actions/lifeStyleHealth/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const LifeStyleHealth: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const location_path: any = useLocation()
  const dispatch = useDispatch()
  const createLifeStyleHealthStatus = useSelector((state: RootState) => state.createLifeStyleHealth)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [loader, setLoader] = useState(false)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<any>()
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const [back, setBack] = useState<any>()

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 5
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
    dispatch(getAnswerBack('lifestyle-health'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (createLifeStyleHealthStatus && createLifeStyleHealthStatus.status === 200) {
      setLoader(false)
      window.location.replace('/lifestyle-physical-exam')
    }
  }, [createLifeStyleHealthStatus, history])

  useEffect(() => {
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 5)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, lifestyleAnswers])

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
        dispatch(createLifeStyleHealth({ sortId: '1', response: formDataObj.comment }))
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
        window.location.replace('/lifestyle-physical-exam')
      }
      if (lifestyleAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="83.3" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 questionnaire-main-section">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="health-cml-logo">
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
                  <div className="health-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="health-header-text">
                <div className="health-sub-heading-1">
                  <b>Lifestyle!</b>
                </div>
                <div className="health-sub-heading-2">
                  <p>Do you have any significant health issues or conditions?</p>
                </div>
                <i className="fa fa-lock health-lock-icon"></i>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="section">
                  <div className="form-group">
                    <div className="form-group health-travel-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="health-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>

                  {loader ? (
                    <div className="health-screen-btns">
                      <Loader />
                    </div>
                  ) : questionId ? (
                    <div className="health-screen-btns">
                      <button type="submit">Update</button>
                    </div>
                  ) : (
                    <div className="health-screen-btns">
                      <a href="/lifestyle-decision">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button type="submit" className="health-continue-btn">
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  )
}

export default withRouter(LifeStyleHealth)
