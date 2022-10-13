import React, { useEffect, useState } from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { createLifeStyleReading } from '../../redux/actions/lifeStyleReading/create'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const LifeStyleReading: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const dispatch = useDispatch()
  const location_path: any = useLocation()
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const createLifeStyleReadingStatus = useSelector((state: RootState) => state.createLifeStyleReading)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const [back, setBack] = useState<any>()
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  let counter = 0

  useEffect(() => {
    dispatch(getAnswerBack('lifestyle-reading'))
    setLoader(true)
  }, [dispatch])

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.options) {
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 3 && answer.sortId === 1
      )
      if (currentAnswer.length) {
        dispatch(
          updateAnswer({
            id: currentAnswer[0].sys.id,
            type: 'string',
            response: formDataObj.options,
            sortId: '1'
          })
        )
        counter += 1
        setLoader(true)
      } else {
        dispatch(createLifeStyleReading({ sortId: '1', response: formDataObj.options }))
        counter += 1
        setLoader(true)
      }
    }
    if (formDataObj.comment) {
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 3 && answer.sortId === 2
      )

      if (currentAnswer.length) {
        const currentAnswerResponse = currentAnswer.filter(
          (answer: { questionId: number; sortId: number; response: string }) =>
            answer.questionId === 3 && answer.sortId === 2 && answer.response !== formDataObj.comment
        )
        if (currentAnswerResponse.length) {
          dispatch(
            updateAnswer({
              id: currentAnswer[0].sys.id,
              type: 'string',
              response: formDataObj.comment,
              sortId: '2'
            })
          )
          setLoader(true)
          counter += 1
        }
      } else {
        setLoader(true)
        counter += 1
        dispatch(createLifeStyleReading({ sortId: '2', response: formDataObj.comment }))
      }
    }
    setAnswerApiCounter(counter)
  }
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptiveAnswer(e.currentTarget.value)
  }

  useEffect(() => {
    if (createLifeStyleReadingStatus && createLifeStyleReadingStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      setLoader(false)
      window.location.replace('/lifestyle-decision')
    }
  }, [createLifeStyleReadingStatus, history, answerApiCounter])

  useEffect(() => {
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 3)
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

  const onSubmit = (event: any) => {
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
        dispatch(createLifeStyleReading({ sortId: '1', response: formDataObj.options }))
        dispatch(createLifeStyleReading({ sortId: '2', response: formDataObj.comment }))
      }

      if (formDataObj.options && formDataObj.comment == '') {
        setLoader(true)
        counter += 2
        dispatch(createLifeStyleReading({ sortId: '1', response: formDataObj.options }))
        dispatch(createLifeStyleReading({ sortId: '2', response: '' }))
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
      if (answers == '') {
        setDescriptiveAnswer('')
        setIsActive({
          isYes: false,
          isNo: false
        })
      }
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
        window.location.replace('/lifestyle-decision')
      }
      if (lifestyleAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch, answerApiCounter])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width=" 49.98" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="reading-cml-logo">
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
                  <div className="reading-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="reading-header-text">
                <div className="reading-sub-heading-1">
                  <b>Lifestyle!</b>
                </div>
                <div className="reading-sub-heading-2">
                  <p>Do you read? What do you read?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="reading-section">
                  <div className="reading-btn-group btn-group-toggle reading-radiobtns" data-toggle="buttons">
                    <div className="reading-items col-md-12">
                      <div className="reading-first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default reading-custom-radio-btn active'
                              : 'btn btn-default reading-custom-radio-btn'
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
                    <div className="reading-items col-md-12">
                      <div className="reading-second-option">
                        <label
                          className={
                            isActive.isNo
                              ? 'btn btn-default reading-custom-radio-btn active'
                              : 'btn btn-default reading-custom-radio-btn '
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

                    <div className="reading-items col-md-12">
                      <div className="reading-form-group">
                        <div className="details-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="reading-details-textarea"
                            placeholder="Details"
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {isAnswerSelected === true ? (
                      <div className="reading-items col-md-12" style={{ marginTop: '10px' }}>
                        <div className="alert alert-danger" role="alert">
                          Please select Yes or No
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {loader ? (
                      <div className="reading-btns-section">
                        <div className="col-md-6">
                          <div className="reading-continue-btn">
                            <Loader />
                          </div>
                        </div>
                        <div className="col-md-6"></div>
                      </div>
                    ) : questionId ? (
                      <div className="reading-btns-section">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                          <div className="reading-skip-btn">
                            <button type="submit">Update</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="reading-btns-section">
                        <div className="reading-btns">
                          <a href="/lifestyle-travel">
                            <input type="button" value="Back" className="back-button-style" />
                          </a>
                          <button className="reading-continue-btn">Continue</button>
                          <button
                            onClick={() => {
                              window.location.replace('/lifestyle-decision')
                            }}
                          >
                            Skip
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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

export default withRouter(LifeStyleReading)
