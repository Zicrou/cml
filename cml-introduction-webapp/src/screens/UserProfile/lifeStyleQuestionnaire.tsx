import React from 'react'
import { Link } from 'react-router-dom'
interface componentProps {
  lifeStyleState: any
  update: boolean
  lifestyleData: any
  showUserData: any
  userId: any
  currentUserId: any
}
const LifeStyleQuestionnaire: React.FC<componentProps> = (props: componentProps) => {
  const { update, lifeStyleState, lifestyleData, showUserData, userId, currentUserId } = props
  return (
    <>
      {lifeStyleState && lifeStyleState.length ? (
        <div>
          <div className="hobbies-question">
            <p>
              What are some of your hobbies?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/lifestyle-hobbies/1',
                      state: {
                        lifestyleAnswers: lifestyleData
                      }
                    }}
                  >
                    {' '}
                    <i className="fas fa-pen"></i>
                  </Link>
                </span>
              ) : null}
            </p>
          </div>
          <div className="hobbies-answer">
            {lifeStyleState &&
              lifeStyleState.map((hobby: any, index: any) => {
                const hobbies: string[] = []
                hobby.hobbies.map((hobbyValue: string) => {
                  if (hobbyValue === 'no') {
                    return null
                  } else {
                    hobbies.push(hobbyValue)
                  }
                })
                return <p key={index}>{hobbies.join(',')}</p>
              })}
            <p>Others:</p>
            <p>{lifeStyleState && lifeStyleState[0].otherHobbies}</p>
          </div>
          <div className="travel-question">
            <p>
              Do you travel? How do you spend your vacations?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/lifestyle-travel/2',
                      state: {
                        lifestyleAnswers: lifestyleData
                      }
                    }}
                  >
                    {' '}
                    <i className="fas fa-pen"></i>
                  </Link>
                </span>
              ) : null}
            </p>
          </div>
          <div className="travel-answer">
            {lifeStyleState && lifeStyleState[0].travel.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}
            <p>{lifeStyleState && lifeStyleState[0].travel.description}</p>
          </div>

          {showUserData ? (
            <>
              {userId && currentUserId != userId ? (
                <div></div>
              ) : (
                <div className="decision-question">
                  <div className="row">
                    <div className="col-md-10 col-lg-11">
                      <p>
                        How do you make big and small decisions in your life?
                        {update ? (
                          <span>
                            <Link
                              to={{
                                pathname: '/lifestyle-decision/3',
                                state: {
                                  lifestyleAnswers: lifestyleData
                                }
                              }}
                            >
                              {' '}
                              <i className="fas fa-pen"></i>
                            </Link>
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <div className="col-md-2 col-lg-1 decision-lock-icon-styling">
                      <i className="fa fa-lock decision-lock-icon"></i>
                    </div>
                  </div>
                </div>
              )}
              {userId && currentUserId != userId ? (
                <div></div>
              ) : (
                <div className="decision-answer">
                  <p>{lifeStyleState && lifeStyleState[0].decisionDescription}</p>
                </div>
              )}
            </>
          ) : null}

          <div className="marriage-question">
            <p>
              If your spouse requested it, would you take a physical exam before marriage?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/lifestyle-physical-exam/6',
                      state: {
                        lifestyleAnswers: lifestyleData
                      }
                    }}
                  >
                    {' '}
                    <i className="fas fa-pen"></i>
                  </Link>
                </span>
              ) : null}
            </p>
          </div>
          <div className="marriage-answer">
            {lifeStyleState && lifeStyleState[0].spouseExam === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}
          </div>
          <div className="fav-color-question">
            <div className="row">
              <div className="col-md-10 col-lg-11">
                <p>
                  Do you read? What do you read?
                  {update ? (
                    <Link
                      to={{
                        pathname: '/lifestyle-reading/3',
                        state: {
                          lifestyleAnswers: lifestyleData
                        }
                      }}
                    >
                      {' '}
                      <i className="fas fa-pen"></i>
                    </Link>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          <div className="fav-color-answer">
            {lifeStyleState && lifeStyleState[0].lifestyleReading.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{lifeStyleState && lifeStyleState[0].lifestyleReading.description}</p>
          </div>
          <div className="fav-color-question">
            <p>
              Do you have any significant health issues or conditions?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/lifestyle-health/5',
                      state: {
                        lifestyleAnswers: lifestyleData
                      }
                    }}
                  >
                    {' '}
                    <i className="fas fa-pen"></i>
                  </Link>
                </span>
              ) : null}
            </p>
          </div>
          <div className="fav-color-answer">
            <p>{lifeStyleState && lifeStyleState[0].healthIssuesDescription}</p>
          </div>
          <div className="fav-color-question">
            <div className="row">
              <div className="col-md-10 col-lg-11">
                <p>
                  Where does your family live?
                  {update ? (
                    <Link
                      to={{
                        pathname: '/lifestyle-family/7',
                        state: {
                          lifestyleAnswers: lifestyleData
                        }
                      }}
                    >
                      {' '}
                      <i className="fas fa-pen"></i>
                    </Link>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          <div className="fav-color-answer">
            <p>{lifeStyleState && lifeStyleState[0].familyDescription}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default LifeStyleQuestionnaire
