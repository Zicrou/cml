import React from 'react'
import { Link } from 'react-router-dom'
interface componentProps {
  relationshipState: any
  update: boolean
  relationshipData: any
}
const RelationshipQuestionnaire: React.FC<componentProps> = (props: componentProps) => {
  const { update, relationshipState, relationshipData } = props
  return (
    <>
      {relationshipState && relationshipState.length ? (
        <div>
          <div className="decision-question">
            <p>
              Who do you consider your immediate family?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-family/8',
                      state: {
                        relationshipAnswers: relationshipData
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
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].immediateFamily}</p>
          </div>
          <div className="decision-question">
            <p>
              Describe some qualities you seek in a spouse.
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-qualities/10',
                      state: {
                        relationshipAnswers: relationshipData
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
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].spouseQualities}</p>
          </div>
          <div className="decision-question">
            <p>
              What are you expecting of your spouse religiously?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-expectation/11',
                      state: {
                        relationshipAnswers: relationshipData
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
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].religiousExpectation}</p>
          </div>
          <div className="decision-question">
            <p>
              What can you offer your mate spiritually?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-spiritual-contribution/12',
                      state: {
                        relationshipAnswers: relationshipData
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
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].spiritualContribution}</p>
          </div>
          <div className="travel-question">
            <p>
              Are you comfortable with an inter-ethnicity marriage?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-marriage/14',
                      state: {
                        relationshipAnswers: relationshipData
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
            {relationshipState && relationshipState[0].interRacialMarriage.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{relationshipState && relationshipState[0].interRacialMarriage.description}</p>
          </div>
          <div className="travel-question">
            <p>
              Are you comfortable with a situation in which either you or your spouse speak a language that the other
              does not understand, with his/her friends or family?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-language/13',
                      state: {
                        relationshipAnswers: relationshipData
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
            {relationshipState && relationshipState[0].languageDifference.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{relationshipState && relationshipState[0].languageDifference.description}</p>
          </div>
          <div className="travel-question">
            <p>
              Do you live with anyone in your family?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/relationship-living/9',
                      state: {
                        relationshipAnswers: relationshipData
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
            {relationshipState && relationshipState[0].livingSituation.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{relationshipState && relationshipState[0].livingSituation.description}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default RelationshipQuestionnaire
