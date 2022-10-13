import React from 'react'
import { FinanceQuestionnaireProps } from "../../types"

const FinanceQuestionnaire: React.FC<FinanceQuestionnaireProps> = (props: FinanceQuestionnaireProps) => {
  const financeState = props.financeState
  return (
    <>
      {financeState && financeState.length ? (
        <div>
          <div className="decision-question">
            <p>How do you define wealth? How important is wealth to you in a potential spouse?</p>
          </div>
          <div className="decision-answer">
            <p>{financeState && financeState[0].financeWealth}</p>
          </div>
          <div className="decision-question">
            <p>What is your financial responsibility in a marriage?</p>
          </div>
          <div className="decision-answer">
            <p>{financeState && financeState[0].financeResponsibility}</p>
          </div>
          <div className="decision-question">
            <p>What are you expecting from your spouse financially?</p>
          </div>
          <div className="decision-answer">
            <p>{financeState && financeState[0].financeExpectation}</p>
          </div>
          <div className="decision-question">
            <p>Are you in debt now? If so, how are you making progress to eliminate the debt?</p>
          </div>
          <div className="decision-answer">
            <p>{financeState && financeState[0].financeDebt}</p>
          </div>

          <div className="travel-question">
            <p>
              Do you support the idea of a wife who works? How do you think adual-income family should manage funds?
            </p>
          </div>
          <div className="marriage-answer">
            
              {financeState && financeState[0].financeWorkingWife.status === 'yes' ? (
                <span className="thumbs-up-emoji">👍</span>
                ) : (
                  <span className="thumbs-down-emoji">👎︎</span>
              )}
            
            <p>{financeState && financeState[0].financeWorkingWife.description}</p>
          </div>

          <div className="travel-question">
            <p>Are you financially responsible for anyone besides yourself?</p>
          </div>
          <div className="marriage-answer">
            
              {financeState && financeState[0].financeDependents.status === 'yes' ? (
                <span className="thumbs-up-emoji">👍</span>
                ) : (
                  <span className="thumbs-down-emoji">👎︎</span>
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
