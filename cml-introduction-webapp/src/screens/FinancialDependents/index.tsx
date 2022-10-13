import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import { createFinancialDependent } from '../../redux/actions/FinancialDependent/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { useHistory } from 'react-router-dom'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import './style.css'

const FinancialDependents: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const financeAnswers = props.location.state && props.location.state.financeAnswers
  const dispatch = useDispatch()
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const createFinancialDependentStatus = useSelector((state: RootState) => state.createFinancialDependent)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  const [back, setBack] = useState<any>()

  window.addEventListener('pageshow', function (event) {
    const historyTraversal =
      event.persisted || (typeof window.performance != 'undefined' && window.performance.navigation.type === 2)
    if (historyTraversal) {
      // Handle page restore.
      alert('refresh')
      window.location.reload()
    }
  })
  useEffect(() => {
    setLoader(false)
  })
  let counter = 0

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.options) {
      counter += 1
      setLoader(true)
      const currentAnswer = financeAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 20 && answer.sortId === 1
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
      const currentAnswer = financeAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 20 && answer.sortId === 2 && answer.response !== formDataObj.comment
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
    dispatch(getAnswerBack('financial-dependents'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (createFinancialDependentStatus && createFinancialDependentStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      if (answerApiCounter === apiCounter) {
        setLoader(false)
        window.location.replace('/financial-responsibility')
      }
    }
  }, [createFinancialDependentStatus, history, answerApiCounter])

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
        dispatch(createFinancialDependent({ sortId: '1', response: formDataObj.options }))
        dispatch(createFinancialDependent({ sortId: '2', response: formDataObj.comment }))
      }

      if (formDataObj.options && formDataObj.comment == '') {
        setLoader(true)
        counter += 2
        dispatch(createFinancialDependent({ sortId: '1', response: formDataObj.options }))
        dispatch(createFinancialDependent({ sortId: '2', response: '' }))
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
        window.location.replace('/financial-responsibility')
      }
      if (financeAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch, answerApiCounter])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="83.3" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="dependent-cml-logo">
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
                  <div className="dependent-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="dependent-header-text">
                <div className="dependent-sub-heading-1">
                  <b>Finance!</b>
                </div>
                <div className="dependent-sub-heading-1">
                  <p>Are you financially responsible for anyone besides yourself?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="dependent-section">
                  <div className="dependent-btn-group btn-group-toggle dependent-radiobtns" data-toggle="buttons">
                    <div className="items col-md-12">
                      <div className="first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default dependent-custom-radio-btn active'
                              : 'btn btn-default dependent-custom-radio-btn'
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
                              ? 'btn btn-default dependent-custom-radio-btn active'
                              : 'btn btn-default dependent-custom-radio-btn '
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
                      <div className="dependent-form-group">
                        <div className="details-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="dependent-details-textarea"
                            placeholder="Details"
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {isAnswerSelected === true ? (
                      <div className="finance-dependent-items col-md-12" style={{ marginTop: '10px' }}>
                        <div className="alert alert-danger" role="alert">
                          Please select Yes or No
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {loader ? (
                      <div className="dependent-btns">
                        <Loader />
                      </div>
                    ) : (
                      <div className="dependent-btns">
                        <a href="/finance-working-wife">
                          <input type="button" value="Back" className="back-button-style" />
                        </a>
                        <button className="dependent-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default FinancialDependents
