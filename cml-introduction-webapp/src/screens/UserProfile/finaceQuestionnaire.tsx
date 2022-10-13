import React from 'react'
import { Link } from 'react-router-dom'
interface componentProps {
  financeState: any
  update: boolean
  financeData: any
}
const FinanceQuestionnaire: React.FC<componentProps> = (props: componentProps) => {
  const { update, financeState, financeData } = props
  return (
    <>
      {financeState && financeState.length ? (
        <div>
          <div className="decision-question">
            <p>
              How do you define wealth? How important is wealth to you in a potential spouse?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/finance-defining-wealth/15',
                      state: {
                        financeAnswers: financeData
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
            <p>{financeState && financeState[0].financeWealth}</p>
          </div>
          <div className="decision-question">
            <p>
              What is your financial responsibility in a marriage?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/financial-responsibility/16',
                      state: {
                        financeAnswers: financeData
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
            <p>{financeState && financeState[0].financeResponsibility}</p>
          </div>
          <div className="decision-question">
            <p>
              What are you expecting from your spouse financially?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/financial-expectation/17',
                      state: {
                        financeAnswers: financeData
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
            <p>{financeState && financeState[0].financeExpectation}</p>
          </div>
          <div className="decision-question">
            <p>
              Are you in debt now? If so, how are you making progress to eliminate the debt?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/financial-debt/19',
                      state: {
                        financeAnswers: financeData
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
            <p>{financeState && financeState[0].financeDebt}</p>
          </div>

          <div className="travel-question">
            <p>
              Do you support the idea of a wife who works? How do you think a dual-income family should manage funds?
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/finance-working-wife/18',
                      state: {
                        financeAnswers: financeData
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
            {financeState && financeState[0].financeWorkingWife.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{financeState && financeState[0].financeWorkingWife.description}</p>
          </div>

          <div className="travel-question">
            <p>
              Are you financially responsible for anyone besides yourself?{' '}
              {update ? (
                <span>
                  <Link
                    to={{
                      pathname: '/financial-dependents/20',
                      state: {
                        financeAnswers: financeData
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
            {financeState && financeState[0].financeDependents.status === 'yes' ? (
              <p className="question-option-style">Yes</p>
            ) : (
              <p className="question-option-style">No</p>
            )}

            <p>{financeState && financeState[0].financeDependents.description}</p>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}
export default FinanceQuestionnaire
