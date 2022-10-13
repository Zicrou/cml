import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import { useDispatch, useSelector } from 'react-redux'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createFinanceDefiningResponsibility } from '../../redux/actions/FinanceDefiningResponsibility/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const FinancialResponsibility: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const financeAnswers = props.location.state && props.location.state.financeAnswers
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const dispatch = useDispatch()
  const createFinanceDefiningResponsibilityStatus = useSelector(
    (state: RootState) => state.createFinanceDefiningResponsibility
  )
  const [loader, setLoader] = useState(false)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [back, setBack] = useState<any>()

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = financeAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 16
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
    dispatch(getAnswerBack('financial-responsibility'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (questionId) {
      const answers = financeAnswers.filter((answer: { questionId: number }) => answer.questionId === 16)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, financeAnswers])
  useEffect(() => {
    if (createFinanceDefiningResponsibilityStatus && createFinanceDefiningResponsibilityStatus.status === 200) {
      setLoader(false)
      window.location.replace('/finance-end')
    }
  }, [createFinanceDefiningResponsibilityStatus, history])

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
        dispatch(createFinanceDefiningResponsibility({ sortId: '1', response: formDataObj.comment }))
      }
    }
  }

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
    if (updateAnswerStatus && updateAnswerStatus.status === 200) {
      setLoader(false)
      dispatch(resetUpdateState())
      if (back != undefined) {
        window.location.replace('/finance-end')
      }
      if (financeAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="100" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="responsibility-cml-logo">
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
                  <div className="responsibility-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="responsibility-header-text">
                <div className="responsibility-sub-heading-1">
                  <b>Finance!</b>
                </div>
                <div className="responsibility-sub-heading-2">
                  <p>What is your financial responsibility in a marriage?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="responsibility-section">
                  <div className="responsibility-form-group">
                    <div className="responsibility-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="responsibility-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>
                  {loader ? (
                    <div className="responsibility-btns">
                      <Loader />
                    </div>
                  ) : (
                    <div className="responsibility-btns">
                      <a href="/financial-dependents">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button className="responsibility-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default FinancialResponsibility
