import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAnswers } from '../../redux/actions/answers/get'
import { RootState } from '../../redux/reducers/index'
import './style.css'
import LogoutButton from '../../components/LogoutButton'
import logo from './logo.png'

const WelcomeBack: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch()
  const getAnswersStatus = useSelector((state: RootState) => state.getAnswers)
  const answerLimit = [
    { id: 1, route: '/lifestyle-hobbies' },
    { id: 2, route: '/lifestyle-travel' },
    { id: 3, route: '/lifestyle-reading' },
    { id: 4, route: '/lifestyle-decision' },
    { id: 5, route: '/lifestyle-health' },
    { id: 6, route: '/lifestyle-physical-exam' },
    //  { id: 7, route: '' },
    { id: 8, route: '/relationship-family' },
    { id: 9, route: '/relationship-living' },
    { id: 10, route: '/relationship-qualities' },
    { id: 11, route: '/relationship-expectation' },
    { id: 12, route: '/relationship-spiritual-contribution' },
    { id: 13, route: '/relationship-language' },
    { id: 14, route: '/relationship-marriage' },
    { id: 15, route: '/finance-defining-wealth' },
    { id: 16, route: '/financial-responsibility' },
    { id: 17, route: '/financial-expectation' },
    { id: 18, route: '/finance-working-wife' },
    { id: 19, route: '/financial-debt' },
    { id: 20, route: '/financial-dependents' },
    { id: 21, route: '/children-desired' },
    { id: 22, route: '/children-existing' }
  ]
  useEffect(() => {
    dispatch(getAnswers())
  }, [dispatch])

  const movetoCurrentQuestion = () => {
    const items = getAnswersStatus.data.items
    let currentQuestion = 0
    const bookmark = Math.max(
      ...items.map(function (o: { questionId: any }) {
        return o.questionId
      })
    )
    if (bookmark === 6) {
      currentQuestion = bookmark + 2
    } else {
      currentQuestion = bookmark + 1
    }
    const found = answerLimit.find((element) => element.id === currentQuestion)
    if (found) {
      history.push(found.route)
    }
  }
  return (
    <>
      {getAnswersStatus === true ? (
        'Loading....'
      ) : (
        <div className="container-fluid">
          <LogoutButton />
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="cml-logo-title">
                <div className="cml-logo">
                  <img src={logo} alt="" />
                </div>
                <div className="logo-title">
                  <b>INTRODUCTIONS</b>
                </div>
              </div>
              <div className="header-text">
                <div className="sub-heading4">
                  <b>Welcome Back!</b>
                </div>
                <div className="sub-heading5">
                  <p>
                    Before we can invite you to our events, lets set up your compatibility profile. This will help
                    prospective spouses see whether you two align with each other before moving forward.
                  </p>
                </div>
                <div className="quiz-btn">
                  <button onClick={movetoCurrentQuestion}>Continue Compatibility Quiz</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      )}
    </>
  )
}

export default WelcomeBack
