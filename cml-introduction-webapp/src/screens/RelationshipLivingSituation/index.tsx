import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createRelationShipLivingSituation } from '../../redux/actions/RelationshipLivingSituation/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'

const RelationShipLivingSituation: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const relationshipAnswers = props.location.state && props.location.state.relationshipAnswers
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const [isActive, setIsActive] = useState({
    isYes: false,
    isNo: false
  })
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)

  const createRelationShipLivingSituationStatus = useSelector(
    (state: RootState) => state.createRelationShipLivingSituation
  )
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<any>()
  let counter = 0
  const dispatch = useDispatch()
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const [back, setBack] = useState<any>()

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    setIsAnswerSelected(false)
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.options) {
      counter += 1
      setLoader(true)
      const currentAnswer = relationshipAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 9 && answer.sortId === 1
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
      const currentAnswer = relationshipAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 9 && answer.sortId === 2 && answer.response !== formDataObj.comment
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
    dispatch(getAnswerBack('relationship-living'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (createRelationShipLivingSituationStatus && createRelationShipLivingSituationStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      if (answerApiCounter === apiCounter) {
        setLoader(false)
        window.location.replace('/relationship-qualities')
      }
    }
  }, [createRelationShipLivingSituationStatus, answerApiCounter, history])

  useEffect(() => {
    if (questionId) {
      const answers = relationshipAnswers.filter((answer: { questionId: number }) => answer.questionId === 9)
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
  }, [questionId, relationshipAnswers])

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
        dispatch(createRelationShipLivingSituation({ sortId: '1', response: formDataObj.options }))
        dispatch(createRelationShipLivingSituation({ sortId: '2', response: formDataObj.comment }))
      }

      if (formDataObj.options && formDataObj.comment == '') {
        setLoader(true)
        counter += 2
        dispatch(createRelationShipLivingSituation({ sortId: '1', response: formDataObj.options }))
        dispatch(createRelationShipLivingSituation({ sortId: '2', response: '' }))
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
        window.location.replace('/relationship-qualities')
      }
      if (relationshipAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch, answerApiCounter])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="28.56" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="living-situation-cml-logo">
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
                  <div className="living-situation-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="living-situation-header-text">
                <div className="living-situation-sub-heading-1">
                  <b>Relationship!</b>
                </div>
                <div className="living-situation-sub-heading-2">
                  <p>Do you live with anyone in your family?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="living-situation-section">
                  <div className="living-situation-btn-group btn-group-toggle radiobtns" data-toggle="buttons">
                    <div className="living-situation-items col-md-12">
                      <div className="living-situation-first-option">
                        <label
                          className={
                            isActive.isYes
                              ? 'btn btn-default living-situation-custom-radio-btn active'
                              : 'btn btn-default living-situation-custom-radio-btn'
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
                    <div className="living-situation-items col-md-12">
                      <div className="living-situation-second-option">
                        <label
                          className={
                            isActive.isNo
                              ? 'btn btn-default living-situation-custom-radio-btn active'
                              : 'btn btn-default living-situation-custom-radio-btn '
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

                    <div className="living-situation-items col-md-12">
                      <div className="living-situation-form-group">
                        <div className="details-textarea">
                          <textarea
                            rows={4}
                            cols={66}
                            name="comment"
                            className="living-situation-details-textarea"
                            placeholder="Details"
                            value={descriptiveAnswer}
                            onChange={onChange}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {isAnswerSelected === true ? (
                      <div className="living-items col-md-12" style={{ marginTop: '10px' }}>
                        <div className="alert alert-danger" role="alert">
                          Please select Yes or No
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {loader ? (
                      <div className="living-situation-btns">
                        <Loader />
                      </div>
                    ) : (
                      <div className="living-situation-btns">
                        <a href="/relationship-family">
                          <input type="button" value="Back" className="back-button-style" />
                        </a>
                        <button className="living-situation-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default withRouter(RelationShipLivingSituation)
