import React, { useEffect, useState } from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import { createLifeStyleFamily } from '../../redux/actions/lifeStyleFamily/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const LifeStyleFamily: React.FC = (props: any) => {
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const dispatch = useDispatch()
  const location_path: any = useLocation()
  const createLifeStyleFamilyStatus = useSelector((state: RootState) => state.createLifeStyleFamily)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [loader, setLoader] = useState(false)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<any>()
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const [back, setBack] = useState<any>()

  useEffect(() => {
    dispatch(getAnswerBack('lifestyle-family'))
    setLoader(true)
  }, [dispatch])

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 7
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
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 7)
      console.log('questionid:', questionId)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, lifestyleAnswers])

  useEffect(() => {
    if (createLifeStyleFamilyStatus && createLifeStyleFamilyStatus.status === 200) {
      setLoader(false)
      window.location.replace('/end-of-life-style')
    }
  }, [createLifeStyleFamilyStatus])

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
        dispatch(createLifeStyleFamily({ sortId: '1', response: formDataObj.comment }))
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
        window.location.replace('/end-of-life-style')
      }
      if (lifestyleAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="66.64" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="decision-cml-logo">
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
                  <div className="decision-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="decision-header-text">
                <div className="decision-sub-heading-1">
                  <b>Lifestyle!</b>
                </div>
                <div className="decision-sub-heading-2">
                  <p>Where does your family live?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="section">
                  <div className="form-group">
                    <div className="form-group decision-travel-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="decision-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>

                  {loader ? (
                    <div className="decision-btns">
                      <Loader />
                    </div>
                  ) : questionId ? (
                    <div className="decision-btns">
                      <button>Update</button>
                    </div>
                  ) : (
                    <div className="decision-btns">
                      <button className="decision-continue-btn">Continue</button>
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

export default withRouter(LifeStyleFamily)
