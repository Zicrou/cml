import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import ProgressBar from '../../components/ProgressBar'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { createRelationShipSpiritualContribution } from '../../redux/actions/RelationshipSpiritualContribution/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'
import { RootState } from '../../redux/reducers/index'

const RelationshipSpiritualContribution: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const relationshipAnswers = props.location.state && props.location.state.relationshipAnswers
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const dispatch = useDispatch()
  const createRelationShipSpiritualContributionStatus = useSelector(
    (state: RootState) => state.createRelationShipSpiritualContribution
  )
  const [loader, setLoader] = useState(false)
  const [descriptiveAnswer, setDescriptiveAnswer] = useState<string>()
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)
  const [back, setBack] = useState<any>()

  const onSubmitUpdate = (event: any) => {
    event.preventDefault()
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.comment) {
      setLoader(true)
      const currentAnswer = relationshipAnswers.filter(
        (answer: { questionId: number; sortId: number }) => answer.questionId === 12
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
    dispatch(getAnswerBack('relationship-spiritual-contribution'))
    setLoader(true)
  }, [dispatch])

  useEffect(() => {
    if (questionId) {
      const answers = relationshipAnswers.filter((answer: { questionId: number }) => answer.questionId === 12)
      setDescriptiveAnswer(answers[0].response)
    }
  }, [questionId, relationshipAnswers])

  useEffect(() => {
    if (createRelationShipSpiritualContributionStatus && createRelationShipSpiritualContributionStatus.status === 200) {
      setLoader(false)
      window.location.replace('/relationship-language')
    }
  }, [createRelationShipSpiritualContributionStatus, history])

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
        dispatch(createRelationShipSpiritualContribution({ sortId: '1', response: formDataObj.comment }))
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
        window.location.replace('/relationship-language')
      }
      if (relationshipAnswers != undefined) {
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, dispatch, history])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="71.4" />
        <LogoutButton />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              {questionId ? (
                <div className="cml-logo-title">
                  <div className="contributions-cml-logo">
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
                  <div className="contributions-cml-logo">
                    <img src={logo} alt="" />
                  </div>
                  <div className="logo-title">
                    <b>INTRODUCTIONS</b>
                  </div>
                </div>
              )}
              <div className="contributions-header-text">
                <div className="contributions-sub-heading-1">
                  <b>Relationship!</b>
                </div>
                <div className="contributions-sub-heading-2">
                  <p>What can you offer your mate spiritually?</p>
                </div>
              </div>
              <Form onSubmit={questionId ? onSubmitUpdate : onSubmit}>
                <div className="contributions-section">
                  <div className="contributions-form-group">
                    <div className="contributions-textarea">
                      <textarea
                        rows={4}
                        cols={66}
                        name="comment"
                        className="contributions-details-textarea"
                        placeholder="Details"
                        required
                        value={descriptiveAnswer}
                        onChange={onChange}
                      ></textarea>
                    </div>
                  </div>
                  {loader ? (
                    <div className="contributions-btns">
                      <Loader />
                    </div>
                  ) : (
                    <div className="contributions-btns">
                      <a href="/relationship-expectation">
                        <input type="button" value="Back" className="back-button-style" />
                      </a>
                      <button className="contributions-continue-btn">{questionId ? 'Update' : 'Continue'}</button>
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

export default withRouter(RelationshipSpiritualContribution)
