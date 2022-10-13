import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import ProgressBar from '../../components/ProgressBar'
import { Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import Loader from '../../components/Loader'
import { createLifeStyleHobbies, resetLifeStyleHobbies } from '../../redux/actions/lifeStyleHobbies/create'
import { updateAnswer, resetUpdateState } from '../../redux/actions/answers/update'
import { RootState } from '../../redux/reducers/index'
import logo from './logo.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import { getAnswerBack } from '../../redux/actions/answers/getAnswerBack'

const LifeStyleHobbies: React.FC = (props: any) => {
  const { history } = props
  const { questionId } = props.match.params
  const lifestyleAnswers = props.location.state && props.location.state.lifestyleAnswers
  const dispatch = useDispatch()
  const [otherHobbies, setOtherHobbies] = useState<string | null | any>(null)
  const [answersList, setAnswersList] = useState<any | null>(null)
  const [isAnswerSelected, setIsAnswerSelected] = useState(false)
  const [answerApiCounter, setAnswerApiCounter] = useState(0)
  const [answerApiUpdateCounter, setAnswerApiUpdateCounter] = useState(0)
  const [loader, setLoader] = useState(false)
  const [back, setBack] = useState<any>()
  const [isReadingActive, setIsReadingActive] = useState(false)
  const [isWatchingTVActive, setIsWatchingTVActive] = useState(false)
  const [isGamingActive, setIsGamingActive] = useState(false)
  const [isGoToMoviesActive, setIsGoToMoviesActive] = useState(false)
  const [isGardeningActive, setIsGardeningActive] = useState(false)

  const [answerApiResponseCounter, setAnswerApiResponseCounter] = useState(0)
  const [answerUpdateApiResponseCounter, setAnswerUpdateApiResponseCounter] = useState(0)
  const createLifeStyleHobbiesStatus = useSelector((state: RootState) => state.createLifeStyleHobbies)
  const updateAnswerStatus = useSelector((state: RootState) => state.updateAnswer)
  const getAnswerBackStatus = useSelector((state: RootState) => state.getAnswerBack)

  let counter = 0
  let counterUpdate = 0

  const createAnswersList = (sortId: number, response: string, type: boolean) => {
    const AnswersArray: { sortId: number; response: string; type: boolean }[] = []
    let isSortIdPresent = true
    setIsAnswerSelected(false)
    if (answersList === null) {
      AnswersArray.push({ sortId, response, type })
      setAnswersList(AnswersArray)
    } else if (answersList !== null) {
      const temp_arr = answersList
      for (let i = 0; i < temp_arr.length; i++) {
        if (temp_arr[i].sortId === sortId) {
          temp_arr[i] = { sortId, response, type: temp_arr[i].type ? false : true }
          setAnswersList(temp_arr)
          isSortIdPresent = false
          break
        }
      }
      if (isSortIdPresent) {
        const temp_arr_1 = answersList
        temp_arr_1.push({ sortId, response, type })
        setAnswersList(temp_arr)
      }
    }
  }
  const handleSubmit = () => {
    setIsAnswerSelected(false)
    if (answersList && answersList.length) {
      setLoader(true)
      counter = answersList.length
      for (let i = 0; i < answersList.length; i++) {
        if (answersList[i].type === true) {
          dispatch(createLifeStyleHobbies(answersList[i]))
        }
      }
      setIsAnswerSelected(false)
    }
    if (otherHobbies != null) {
      setLoader(true)
      dispatch(createLifeStyleHobbies({ sortId: '6', response: otherHobbies }))
      counter += 1
      setIsAnswerSelected(false)
    }
    if (otherHobbies === null && answersList === null) {
      if (back != undefined && back != '') {
        window.location.replace('/lifestyle-travel')
      } else {
        setIsAnswerSelected(true)
      }
    }
    setAnswerApiCounter(counter)
  }
  const handleUpdate = () => {
    if (answersList !== null) {
      setLoader(true)
      counterUpdate = answersList.length
      for (let i = 0; i < answersList.length; i++) {
        const currentAnswer = lifestyleAnswers.filter(
          (answer: { questionId: number; sortId: number; response: string }) =>
            answer.questionId === 1 && answer.sortId === answersList[i].sortId
        )
        if (currentAnswer.length) {
          dispatch(
            updateAnswer({
              id: currentAnswer[0].sys.id,
              type: 'string',
              response: currentAnswer[0].response === 'no' ? answersList[i].response : 'no',
              sortId: currentAnswer[0].sortId
            })
          )
        } else {
          counter = answersList.length
          dispatch(createLifeStyleHobbies(answersList[i]))
        }
      }
    }
    if (otherHobbies != null) {
      const currentAnswer = lifestyleAnswers.filter(
        (answer: { questionId: number; sortId: number; response: string }) =>
          answer.questionId === 1 && answer.sortId === 6
      )
      if (currentAnswer.length) {
        if (currentAnswer[0].response !== otherHobbies) {
          dispatch(
            updateAnswer({
              id: currentAnswer[0].sys.id,
              type: 'string',
              response: otherHobbies,
              sortId: '6'
            })
          )
          counterUpdate += 1
        }
      } else {
        counter += 1
        dispatch(createLifeStyleHobbies({ sortId: '6', response: otherHobbies }))
      }
    }

    setAnswerApiUpdateCounter(counterUpdate)
    setAnswerApiCounter(counter)
  }

  useEffect(() => {
    dispatch(getAnswerBack('lifestyle-hobbies'))
    setLoader(true)
  }, [dispatch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherHobbies(e.currentTarget.value)
    setIsAnswerSelected(false)
  }

  useEffect(() => {
    if (getAnswerBackStatus && getAnswerBackStatus.status == 200) {
      setLoader(false)
      const answers = getAnswerBackStatus.data
      setBack(answers)
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1) {
          setIsReadingActive(true)
        }
        if (answers[i].sortId === 2) {
          setIsWatchingTVActive(true)
        }
        if (answers[i].sortId === 3) {
          setIsGamingActive(true)
        }
        if (answers[i].sortId === 4) {
          setIsGoToMoviesActive(true)
        }
        if (answers[i].sortId === 5) {
          setIsGardeningActive(true)
        }
        if (answers[i].sortId === 6) {
          setOtherHobbies(answers[i].response)
        }
      }
    }
  }, [getAnswerBackStatus])

  useEffect(() => {
    if (createLifeStyleHobbiesStatus && createLifeStyleHobbiesStatus.status == 200) {
      const apiCounter = answerApiResponseCounter + 1
      setAnswerApiResponseCounter(apiCounter)
      if (answerApiCounter === apiCounter) {
        setLoader(false)
        questionId ? window.location.replace('/profile') : window.location.replace('/lifestyle-travel')
        dispatch(resetLifeStyleHobbies())
        dispatch(resetUpdateState())
      }
    }
  }, [createLifeStyleHobbiesStatus, history, dispatch, questionId, answerApiCounter])

  useEffect(() => {
    if (updateAnswerStatus && updateAnswerStatus.status == 200) {
      setLoader(true)
      const apiCounter = answerUpdateApiResponseCounter + 1
      setAnswerUpdateApiResponseCounter(apiCounter)
      if (answerApiUpdateCounter === apiCounter) {
        setLoader(false)
        dispatch(resetUpdateState())
        dispatch(resetLifeStyleHobbies())
        window.location.replace('/profile')
      }
    }
  }, [updateAnswerStatus, history, dispatch, answerUpdateApiResponseCounter])

  useEffect(() => {
    if (questionId) {
      const answers = lifestyleAnswers.filter((answer: { questionId: number }) => answer.questionId === 1)
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].sortId === 1 && answers[i].response !== 'no') {
          setIsReadingActive(true)
        }

        if (answers[i].sortId === 2 && answers[i].response !== 'no') {
          setIsWatchingTVActive(true)
        }
        if (answers[i].sortId === 3 && answers[i].response !== 'no') {
          setIsGamingActive(true)
        }
        if (answers[i].sortId === 4 && answers[i].response !== 'no') {
          setIsGoToMoviesActive(true)
        }
        if (answers[i].sortId === 5 && answers[i].response !== 'no') {
          setIsGardeningActive(true)
        }
        if (answers[i].sortId === 6) {
          setOtherHobbies(answers[i].response)
        }
      }
    }
  }, [questionId, lifestyleAnswers])

  return (
    <>
      <div className="container-fluid">
        <ProgressBar width="16.66" />
        <LogoutButton />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            {questionId ? (
              <div className="cml-logo-title">
                <div className="hobbies-cml-logo">
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
                <div className="hobbies-cml-logo">
                  <img src={logo} alt="" />
                </div>
                <div className="logo-title">
                  <b>INTRODUCTIONS</b>
                </div>
              </div>
            )}
            <div className="hobbies-header-text">
              <div className="hobbies-sub-heading-1">
                <b>Lifestyle!</b>
              </div>
              <div className="hobbies-sub-heading-1">
                <p>WHAT ARE SOME OF YOUR HOBBIES?</p>
              </div>
              <div className="hobbies-sub-heading-3">
                <p>(SELECT AS MANY AS YOU WANT)</p>
              </div>
            </div>
            <div className="hobbies-section">
              <div className="hobbies-form-group">
                <div
                  className="hobbies-items col-md-12"
                  onClick={() => {
                    createAnswersList(1, 'Reading', true)
                    setIsReadingActive(!isReadingActive)
                  }}
                >
                  <div className="hobbies-btn-group">
                    <p
                      className={
                        isReadingActive
                          ? 'btn btn-default hobbies-select-button active'
                          : 'btn btn-default hobbies-select-button'
                      }
                    >
                      Reading
                    </p>
                  </div>
                </div>
                <div
                  className="hobbies-items col-md-12"
                  onClick={() => {
                    createAnswersList(2, 'Watching TV', true)
                    setIsWatchingTVActive(!isWatchingTVActive)
                  }}
                >
                  <div data-toggle="buttons" className="hobbies-btn-group">
                    <p
                      className={
                        isWatchingTVActive
                          ? 'btn btn-default hobbies-select-button active'
                          : 'btn btn-default hobbies-select-button'
                      }
                    >
                      Watching TV
                    </p>
                  </div>
                </div>

                <div
                  className="hobbies-items col-md-12"
                  onClick={() => {
                    createAnswersList(3, 'Gaming', true)
                    setIsGamingActive(!isGamingActive)
                  }}
                >
                  <div data-toggle="buttons" className="hobbies-btn-group">
                    <p
                      className={
                        isGamingActive
                          ? 'btn btn-default hobbies-select-button active'
                          : 'btn btn-default hobbies-select-button'
                      }
                    >
                      Gaming
                    </p>
                  </div>
                </div>

                <div
                  className="hobbies-items col-md-12"
                  onClick={() => {
                    createAnswersList(4, 'Go to the Movies', true)
                    setIsGoToMoviesActive(!isGoToMoviesActive)
                  }}
                >
                  <div data-toggle="buttons" className="hobbies-btn-group">
                    <p
                      className={
                        isGoToMoviesActive
                          ? 'btn btn-default hobbies-select-button active'
                          : 'btn btn-default hobbies-select-button'
                      }
                    >
                      Go to the Movies
                    </p>
                  </div>
                </div>

                <div
                  className="hobbies-items col-md-12"
                  onClick={() => {
                    createAnswersList(5, 'Gardening', true)
                    setIsGardeningActive(!isGardeningActive)
                  }}
                >
                  <div data-toggle="buttons" className="hobbies-btn-group">
                    <p
                      className={
                        isGardeningActive
                          ? 'btn btn-default hobbies-select-button active'
                          : 'btn btn-default hobbies-select-button'
                      }
                    >
                      Gardening
                    </p>
                  </div>
                </div>

                <div className="hobbies-items col-md-12">
                  <div data-toggle="buttons" className="hobbies-btn-group">
                    <p className="btn btn-default hobbies-select-button">Other(Please list any other hobbies)</p>
                  </div>
                </div>

                <div className="hobbies-items col-md-12">
                  <div className="form-group outline additional-hobbies">
                    <input
                      type="text"
                      className="additional-hobbies-input"
                      placeholder="Other hobbies"
                      id="other-hobbies"
                      name="other"
                      onChange={handleChange}
                      required
                      value={otherHobbies}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isAnswerSelected === true ? (
              <div className="hobbies-items col-md-12">
                <div className="alert alert-danger" role="alert">
                  Please select atleast one hobby
                </div>
              </div>
            ) : (
              ''
            )}
            {loader ? (
              <div className="hobbies-continue-btn">
                <Loader />
              </div>
            ) : questionId ? (
              <div className="hobbies-continue-btn">
                <button onClick={handleUpdate}>Update</button>
              </div>
            ) : (
              <div className="hobbies-continue-btn">
                <button onClick={handleSubmit}>Continue</button>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-3"></div>
      </div>
    </>
  )
}

export default withRouter(LifeStyleHobbies)
