import React from 'react'
import { Link } from 'react-router-dom'
interface componentProps {
  childrenState: any
  update: boolean
  childrenData: any
}
const ChildrenQuestionnaire: React.FC<componentProps> = (props: componentProps) => {
  const { childrenState, update, childrenData } = props
  return (
    <>
      {childrenState && childrenState.length ? (
        <div>
          <div className="travel-question">
            <p>
              {' '}
              Do you want children?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/children-desired/21',
                      state: {
                        childrenAnswers: childrenData
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
            {childrenState && childrenState[0].childrenDesired.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{childrenState && childrenState[0].childrenDesired.description}</p>
          </div>

          <div className="travel-question">
            <p>
              Do you have children now? If yes, please describe your relationship with them and their parents.{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/children-existing/22',
                      state: {
                        childrenAnswers: childrenData
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
            {childrenState && childrenState[0].childrenExist.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{childrenState && childrenState[0].childrenExist.description}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default ChildrenQuestionnaire
