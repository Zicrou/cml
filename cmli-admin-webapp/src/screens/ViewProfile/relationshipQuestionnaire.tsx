import React from 'react'
import { RelationshipQuestionnaireProps } from "../../types";

const RelationshipQuestionnaire: React.FC<RelationshipQuestionnaireProps> = (props: RelationshipQuestionnaireProps) => {
  const relationshipState = props.relationshipState
  return (
    <>
      {relationshipState && relationshipState.length ? (
        <div>
          <div className="decision-question">
            <p>Who do you consider your immediate family?</p>
          </div>
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].immediateFamily}</p>
          </div>

          <div className="decision-question">
            <p>Describe some qualities you seek in a spouse</p>
          </div>
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].spouseQualities}</p>
          </div>

          <div className="decision-question">
            <p>What are you expecting of your spouse religiously?</p>
          </div>
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].religiousExpectation}</p>
          </div>

          <div className="decision-question">
            <p>What can you offer your mate spiritually?</p>
          </div>
          <div className="decision-answer">
            <p>{relationshipState && relationshipState[0].spiritualContribution}</p>
          </div>

          <div className="travel-question">
            <p>Are you comfortable with an inter-racial marriage?</p>
          </div>
          <div className="marriage-answer">

            {relationshipState && relationshipState[0].interRacialMarriage.status === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
            )}

            <p>{relationshipState && relationshipState[0].interRacialMarriage.description}</p>
          </div>

          <div className="travel-question">
            <p>
              Are you comfortable with a situation in which either you or your spousespeak a language that the other
              does not understand, with his/her friends or family?
            </p>
          </div>
          <div className="marriage-answer">

            {relationshipState && relationshipState[0].languageDifference.status === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
            )}

            <p>{relationshipState && relationshipState[0].languageDifference.description}</p>
          </div>

          <div className="travel-question">
            <p>Do you live with anyone in your family?</p>
          </div>
          <div className="marriage-answer">

            {relationshipState && relationshipState[0].livingSituation.status === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
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
