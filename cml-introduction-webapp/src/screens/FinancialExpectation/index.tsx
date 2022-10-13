import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createFinanceExpectation } from '../../redux/actions/FinanceExpectation/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const FinancialExpectation: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const financeAnswers = props.location.state && props.location.state.financeAnswers
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const dispatch = useDispatch()
  const createFinanceExpectationStatus = useSelector((state: RootState) => state.createFinanceExpectation)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const [loader, setLoader] = useState(false)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [back, setBack] = useState<any>()

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
        dispatch(createFinanceExpectation({ sortId: '1', response: formDataObj.comment }))
      }
    }
  }

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = financeAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 17
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
    dispatch(getAnswerBack('financial-expectation'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (getAnswerBackStatus && getAnswerBackStatus.status == 200) {
      setLoader(false)
      const answers = getAnswerBackStatus.data
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1) {
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
      const answers = financeAnswers.filter((answer: { questionId: number }) => answer.questionId === 17)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, financeAnswers])

  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/financial-debt')
      }
      if (financeAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])
  useEffect(() => {
    if (createFinanceExpectationStatus && createFinanceExpectationStatus.status === 200) {
      setLoader(false)
      window.location.replace('/financial-debt')
    }
  }, [createFinanceExpectationStatus, history])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="16.66" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 questionnaire-main-section">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="marriages-cml-logo">
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
                  <div className="marriages-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="marriages-header-text">
                <div className="marriages-sub-heading-1">
                  <b>Finance!</b>
                </div>
                <div className="marriages-sub-heading-2">
                  <p>What are you expecting from your spouse financially?</p>
                </div>
              </div>
              <div className="marriages-section">
                <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                  <div className="marriages-btn-group btn-group-toggle radiobtns" data-toggle="buttons">
                    <div className="items col-md-12">
                      <div className="marriages-form-group">
                        <div className="marriages-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="marriages-details-textarea"
                            placeholder="Details"
                            required
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {loader ? (
                      <div className="fin-expections-continue-btns">
                        <Loader />
                      </div>
                    ) : (
                      <div className="fin-expections-continue-btns">
                        <a href="/relationship-endscreen">
                          <input type="button" value="Back" className="back-button-style" />
                        </a>
                        <button>{questionId ? 'Update' : 'Continue'}</button>
                      </div>
                    )}
                  </div>
                </Form>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialExpectation
