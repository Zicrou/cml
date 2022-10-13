import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createLifeStyleTravel } from '../../redux/actions/lifeStyleTravel/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'

const LifeStyleTravel: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const dispatch = useDispatch()
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const createLifeStyleTravelStatus = useSelector((state: RootState) => state.createLifeStyleTravel)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })

  const [descriptiveAnswer, setDescriptiveAnswer] = useState<any>()
  let counter = 0
  const [back, setBack] = useState<any>()

  useEffect(() => {
    dispatch(getAnswerBack('lifestyle-travel'))
    setLoader(true)
  }, [dispatch])

  const onSubmitUpdateForm = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.options) {
      counter += 1
      setLoader(true)
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 2 && answer.sortId === 1
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
    if (formDataObj.comment) {
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 2 && answer.sortId === 2 && answer.response !== formDataObj.comment
      )
      if (currentAnswer.length) {
        setLoader(true)
        counter += 1
        dispatch(
          updateAnswer({
            id: currentAnswer[0].sys.id,
            type: 'string',
            response: formDataObj.comment,
            sortId: '2'
          })
        )
      }
    }
    setAnswerApiCounter(counter)
  }
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptiveAnswer(e.currentTarget.value)
  }
  useEffect(() => {
    if (createLifeStyleTravelStatus && createLifeStyleTravelStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      setLoader(false)
      window.location.replace('/lifestyle-reading')
    }
  }, [createLifeStyleTravelStatus, answerApiCounter, history])

  useEffect(() => {
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 2)
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1) {
          setIsActive({
            isYes: answers[i].response == 'yes' ? true : false,
            isNo: answers[i].response == 'no' ? true : false
          })
        }
        if (answers[i].sortId === 2) {
          setDescriptiveAnswer(answers[i].response)
        }
      }
    }
  }, [questionId, lifestyleAnswers])

  const onSubmitForm = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    const hasOptionsProperty = Object.prototype.hasOwnProperty.call(formDataObj, 'options')

    if (back != undefined && back != '') {
      setLoader(true)
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
      dispatch(
        updateAnswer({
          id: back[1].sys.id,
          type: 'string',
          response: formDataObj.comment,
          sortId: '2'
        })
      )
    } else {
      if (formDataObj.options && formDataObj.comment != '') {
        setLoader(true)
        counter += 2
        dispatch(createLifeStyleTravel({ sortId: '1', response: formDataObj.options }))
        dispatch(createLifeStyleTravel({ sortId: '2', response: formDataObj.comment }))
      }

      if (formDataObj.options && formDataObj.comment == '') {
        setLoader(true)
        counter += 2
        dispatch(createLifeStyleTravel({ sortId: '1', response: formDataObj.options }))
        dispatch(createLifeStyleTravel({ sortId: '2', response: '' }))
      }

      if (!hasOptionsProperty) {
        setIsAnswerSelected(true)
      }
    }
    setAnswerApiCounter(counter)
  }

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
        if (answers[i].sortId === 2) {
          setDescriptiveAnswer(answers[i].response)
        }
        if (answers) {
          setBack(answers)
        }
      }
    }
  }, [getAnswerBackStatus])

  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status == 200) {
      setLoader(true)
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      if (answerApiCounter === apiCounter) {
        setLoader(false)
        dispatch(resetUpdateState())
      }
      if (back != undefined) {
        window.location.replace('/lifestyle-reading')
      }
      if (lifestyleAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch, answerApiCounter])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="33.32" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="travel-cml-logo">
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
                  <div className="travel-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}

              <div className="travel-header-text">
                <div className="travel-sub-heading-1">
                  <b>Lifestyle!</b>
                </div>
                <div className="travel-sub-heading-2">
                  <p>Do you travel? How do you spend your vacations?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdateForm : onSubmitForm}>
                <div className="travel-section">
                  <div className="travel-btn-group btn-group-toggle radiobtns" data-toggle="buttons">
                    <div className="travel-items col-md-12">
                      <div className="travel-first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default travel-custom-radio-btn active'
                              : 'btn btn-default travel-custom-radio-btn'
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
                    </div>
                    <div className="travel-items col-md-12">
                      <div className="travel-second-option">
                        <label
                          className={
                            isActive.isNo
                              ? 'btn btn-default travel-custom-radio-btn active'
                              : 'btn btn-default travel-custom-radio-btn '
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

                    <div className="travel-items col-md-12">
                      <div className="travel-form-group">
                        <div className="details-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="travel-details-textarea"
                            placeholder="Details"
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {isAnswerSelected === true ? (
                      <div className="travel-items col-md-12" style={{ marginTop: '10px' }}>
                        <div className="alert alert-danger" role="alert">
                          Please select Yes or No
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {loader ? (
                      <div className="travel-btns">
                        <Loader />
                      </div>
                    ) : questionId ? (
                      <div className="travel-btns">
                        <button type="submit">Update</button>
                      </div>
                    ) : (
                      <div className="travel-btns">
                        <a href="/lifestyle-hobbies">
                          <input type="button" value="Back" className="back-button-style" />
                        </a>
                        <button type="submit" className="travel-continue-btn">
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
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

export default withRouter(LifeStyleTravel)
