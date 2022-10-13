import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import { createChildrenDesired } from '../../redux/actions/childrenDesired/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import './style.css'

const ChildrenDesired: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const childrenAnswers = props.location.state && props.location.state.childrenAnswers
  const dispatch = useDispatch()
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const createChildrenDesiredStatus = useSelector((state: RootState) => state.createChildrenDesired)
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const [loader, setLoader] = useState(false)
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  const [back, setBack] = useState<any>()
  let counter = 0
  const onSubmit = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    const hasOptionsProperty = Object.prototype.hasOwnProperty.call(formDataObj, 'options')

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
      dispatch(
        updateAnswer({
          id: back[1].sys.id,
          type: 'string',
          response: formDataObj.comment,
          sortId: '2'
        })
      )
      setLoader(true)
    } else {
      if (formDataObj.options && formDataObj.comment != '') {
        setLoader(true)
        counter += 2
        dispatch(createChildrenDesired({ sortId: '1', response: formDataObj.options }))
        dispatch(createChildrenDesired({ sortId: '2', response: formDataObj.comment }))
      }

      if (formDataObj.options && formDataObj.comment == '') {
        setLoader(true)
        counter += 2
        dispatch(createChildrenDesired({ sortId: '1', response: formDataObj.options }))
        dispatch(createChildrenDesired({ sortId: '2', response: '' }))
      }

      if (!hasOptionsProperty) {
        setIsAnswerSelected(true)
      }
    }
    setAnswerApiCounter(counter)
  }
  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.options) {
      counter += 1
      setLoader(true)
      const currentAnswer = childrenAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 21 && answer.sortId === 1
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
      const currentAnswer = childrenAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 21 && answer.sortId === 2 && answer.response !== formDataObj.comment
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
    dispatch(getAnswerBack('children-desired'))
    setLoader(true)
  }, [dispatch])

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
    if (questionId) {
      const answers = childrenAnswers.filter((answer: { questionId: number }) => answer.questionId === 21)
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
  }, [questionId, childrenAnswers])

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
        window.location.replace('/children-existing')
      }
      if (childrenAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, answerApiCounter, history])
  useEffect(() => {
    if (createChildrenDesiredStatus && createChildrenDesiredStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      if (answerApiCounter === apiCounter) {
        setLoader(false)
        window.location.replace('/children-existing')
      }
    }
  }, [createChildrenDesiredStatus, answerApiCounter, history])
  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="50" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="desiredchild-cml-logo">
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
                  <div className="desiredchild-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="desiredchild-header-text">
                <div className="desiredchild-sub-heading-1">
                  <b>Children!</b>
                </div>
                <div className="desiredchild-sub-heading-2">
                  <p>Do you want children?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="desiredchild-section">
                  <div className="desiredchild-btn-group btn-group-toggle desiredchild-radiobtns" data-toggle="buttons">
                    <div className="items col-md-12">
                      <div className="first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default desiredchild-custom-radio-btn active'
                              : 'btn btn-default desiredchild-custom-radio-btn'
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
                    <div className="items col-md-12">
                      <div className="second-option">
                        <label
                          className={
                            isActive.isNo
                              ? 'btn btn-default desiredchild-custom-radio-btn active'
                              : 'btn btn-default desiredchild-custom-radio-btn '
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

                    <div className="items col-md-12">
                      <div className="desiredchild-form-group">
                        <div className="details-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="desiredchild-details-textarea"
                            placeholder="Details"
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {isAnswerSelected === true ? (
                      <div className="desired-items col-md-12" style={{ marginTop: '10px' }}>
                        <div className="alert alert-danger" role="alert">
                          Please select Yes or No
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {loader ? (
                      <div className="desiredchild-continue-btns">
                        <Loader />
                      </div>
                    ) : (
                      <div className="desiredchild-continue-btns">
                        <a href="/finance-end">
                          <input type="button" value="Back" className="back-button-style" />
                        </a>
                        <button>{questionId ? 'Update' : 'Continue'}</button>
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

export default ChildrenDesired
