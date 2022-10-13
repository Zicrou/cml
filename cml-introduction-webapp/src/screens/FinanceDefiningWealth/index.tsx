import React, { useEffect, useState } from 'react'
import { Spinner, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createFinanceDefiningWealth } from '../../redux/actions/FinanceDefiningWealth/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const FinanceDefiningWealth: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const financeAnswers = props.location.state && props.location.state.financeAnswers
  const createFinanceDefiningWealthStatus = useSelector((state: RootState) => state.createFinanceDefiningWealth)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [loader, setLoader] = useState(false)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const dispatch = useDispatch()
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
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
        dispatch(createFinanceDefiningWealth({ sortId: '1', response: formDataObj.comment }))
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
        (answer: { questionId: number; sortId: number }) => answer.questionId === 15
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
    dispatch(getAnswerBack('finance-defining-wealth'))
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
      }
      if (answers) {
        setBack(answers)
      }
    }
  }, [getAnswerBackStatus])

  useEffect(() => {
    if (questionId) {
      const answers = financeAnswers.filter((answer: { questionId: number }) => answer.questionId === 15)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, financeAnswers])
  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/finance-working-wife')
      }
      if (financeAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch])
  useEffect(() => {
    if (createFinanceDefiningWealthStatus && createFinanceDefiningWealthStatus.status === 200) {
      setLoader(false)
      window.location.replace('/finance-working-wife')
    }
  }, [createFinanceDefiningWealthStatus, history])
  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="49.98" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="wealth-cml-logo">
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
                  <div className="wealth-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="wealth-header-text">
                <div className="wealth-sub-heading-1">
                  <b>Finance!</b>
                </div>
                <div className="wealth-sub-heading-2">
                  <p>How do you define wealth? How important is wealth to you in a potential spouse?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="wealth-section">
                  <div className="wealth-form-group">
                    <div className="wealth-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="wealth-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>
                  {loader ? (
                    <div className="wealth-btns">
                      <Loader />
                    </div>
                  ) : (
                    <div className="wealth-btns">
                      <a href="/financial-debt">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button className="wealth-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default FinanceDefiningWealth
