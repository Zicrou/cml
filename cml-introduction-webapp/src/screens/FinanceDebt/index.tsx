import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createFinanceDebt } from '../../redux/actions/FinanceDebt/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'

const FinanceDept: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const financeAnswers = props.location.state && props.location.state.financeAnswers
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const dispatch = useDispatch()
  const createFinanceDebtStatus = useSelector((state: RootState) => state.createFinanceDebt)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [loader, setLoader] = useState(false)
  const [back, setBack] = useState<any>()

  const onSubmit = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())

    if (back != undefined && back != '') {
      dispatch(
        updateAnswer({
          id: back[0].sys.id,
          type: 'string',
          response: formDataObj.comment,
          sortId: '1'
        })
      )
      setLoader(true)
    } else {
      if (formDataObj.comment) {
        setLoader(true)
        dispatch(createFinanceDebt({ sortId: '1', response: formDataObj.comment }))
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
        (answer: { questionId: number; sortId: number }) => answer.questionId === 19
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
    dispatch(getAnswerBack('financial-debt'))
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
      const answers = financeAnswers.filter((answer: { questionId: number }) => answer.questionId === 19)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, financeAnswers])
  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/finance-defining-wealth')
      }
      if (financeAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])
  useEffect(() => {
    if (createFinanceDebtStatus && createFinanceDebtStatus.status === 200) {
      setLoader(false)
      window.location.replace('/finance-defining-wealth')
    }
  }, [createFinanceDebtStatus, history])
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
                  <div className="fin-expections-cml-logo">
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
                  <div className="fin-expections-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="fin-expections-header-text">
                <div className="fin-expections-sub-heading-1">
                  <b>Finance!</b>
                </div>
                <div className="fin-expections-sub-heading-1">
                  <p>Are you in debt now? If so, how are you making progress to eliminate the debt?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="fin-expections-section">
                  <div className="fin-expections-form-group">
                    <div className="fin-expections-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="fin-expections-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>
                  {loader ? (
                    <div className="debt-btns">
                      <Loader />
                    </div>
                  ) : (
                    <div className="debt-btns">
                      <a href="/financial-expectation">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button className="debt-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default FinanceDept
