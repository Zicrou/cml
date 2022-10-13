import React, { useEffect, useState } from 'react'
import { Link, withRouter, useLocation, useHistory } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import './style.css'
import LogoutButton from '../../components/LogoutButton'
import { createLifeStylePhysicalExam } from '../../redux/actions/lifeStylePhysicalExam/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'

const LifeStylePhysicalExam: React.FC = (props: any) => {
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const createLifeStylePhysicalExamStatus = useSelector((state: RootState) => state.createLifeStylePhysicalExam)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const [back, setBack] = useState<any>()

  const onSubmit = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())

    if (back != undefined && back != '') {
      isActive.isYes == false
        ? dispatch(
            updateAnswer({
              id: back && back[0].sys.id,
              type: 'string',
              response: 'no',
              sortId: '1'
            })
          )
        : dispatch(
            updateAnswer({
              id: back && back[0].sys.id,
              type: 'string',
              response: 'yes',
              sortId: '1'
            })
          )
      setLoader(true)
    } else {
      if (formDataObj.options) {
        setLoader(true)
        dispatch(createLifeStylePhysicalExam({ sortId: '1', response: formDataObj.options }))
      }
    }
  }
  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())

    if (formDataObj.options) {
      setLoader(true)
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 6
      )

      dispatch(
        updateAnswer({
          id: currentAnswer[0].sys.id,
          type: 'string',
          response: formDataObj.options,
          sortId: '1'
        })
      )
    }
  }

  useEffect(() => {
    dispatch(getAnswerBack('lifestyle-physical-exam'))
    setLoader(true)
  }, [])

  useEffect(() => {
    if (createLifeStylePhysicalExamStatus && createLifeStylePhysicalExamStatus.status === 200) {
      setLoader(false)
      window.location.replace('/lifestyle-family')
    }
  }, [createLifeStylePhysicalExamStatus])

  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/lifestyle-family')
      }
      if (lifestyleAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch])

  useEffect(() => {
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 6)
      setIsActive({
        isYes: answers[0].response == 'yes' ? true : false,
        isNo: answers[0].response == 'no' ? true : false
      })
    }
  }, [questionId, lifestyleAnswers])

  useEffect(() => {
    if (getAnswerBackStatus && getAnswerBackStatus.status == 200) {
      setLoader(false)
      const answers = getAnswerBackStatus.data
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1) {
          setIsActive({
            isYes: answers[i].response == 'yes' ? true : false,
            isNo: answers[i].response == 'no' ? true : false
          })
        }
        if (answers) {
          setBack(answers)
        }
      }
    }
  }, [getAnswerBackStatus])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="100" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 questionnaire-main-section">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="physicalexam-cml-logo">
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
                  <div className="physicalexam-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="physicalexam-header-text">
                <div className="physicalexam-sub-heading-1">
                  <b>Lifestyle!</b>
                </div>
                <div className="physicalexam-sub-heading-2">
                  <p>If you spouse requested it, would you take a physical exam by a physician before marriage?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="physicalexam-section">
                  <div className="physicalexam-form-group">
                    <div className="btn-group btn-group-toggle physicalexam-radiobtns" data-toggle="buttons">
                      <div className="physicalexam-first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default physicalexam-custom-radio-btn active'
                              : 'btn btn-default physicalexam-custom-radio-btn'
                          }
                          onChange={() => {
                            setIsActive({
                              isYes: !isActive.isYes,
                              isNo: false
                            })
                          }}
                        >
                          <input type="radio" name="options" id="option1" value="yes" /> Yes
                        </label>
                      </div>
                      <div className="physicalexam-second-option">
                        <label
                          className={
                            isActive.isNo
                              ? 'btn btn-default physicalexam-custom-radio-btn active'
                              : 'btn btn-default physicalexam-custom-radio-btn '
                          }
                          onChange={() => {
                            setIsActive({
                              isYes: false,
                              isNo: !isActive.isNo
                            })
                          }}
                        >
                          <input type="radio" name="options" id="option2" value="no" /> No
                        </label>
                      </div>
                    </div>
                  </div>
                  {isAnswerSelected === true ? (
                    <div className="physicalexam-items col-md-12" style={{ marginTop: '10px' }}>
                      <div className="alert alert-danger" role="alert">
                        Please select Yes or No
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  {loader ? (
                    <div className="physicalexam-btns">
                      <Loader />
                    </div>
                  ) : (
                    <div className="physicalexam-btns">
                      <a href="/lifestyle-health">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button className="physicalexam-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default withRouter(LifeStylePhysicalExam)
