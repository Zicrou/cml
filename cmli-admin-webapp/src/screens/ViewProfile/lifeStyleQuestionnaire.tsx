import React from 'react';
import { LifestyleComponentProps } from "../../types"; 

const LifeStyleQuestionnaire: React.FC<LifestyleComponentProps> = (props: LifestyleComponentProps) => {
  const lifeStyleState = props.lifeStyleState
  return (
    <>
      {lifeStyleState && lifeStyleState.length ? (
        <div>
          <div className="hobbies-question">
            <p>What are some of your hobbies?</p>
          </div>
          <div className="hobbies-answer">
            {lifeStyleState &&
              lifeStyleState.map((hobby: any, index: any) => {
                return <p key={index}>{hobby.hobbies.join(',')}</p>
              })}
            <p>Others:</p>
            <p>{lifeStyleState && lifeStyleState[0].otherHobbies}</p>
          </div>
          <div className="travel-question">
            <p>Do you travel? How do you spend your vacations?</p>
          </div>
          <div className="travel-answer">
            {lifeStyleState && lifeStyleState[0].travel.status === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
            )}

            <p>{lifeStyleState && lifeStyleState[0].travel.description}</p>
          </div>
          <div className="decision-question">
            <p>
              How do you make big and small decisions in your life?
              <span>
                <i className="fa fa-lock decision-lock-icon"></i>
              </span>
            </p>
          </div>
          <div className="decision-answer">
            <p>{lifeStyleState && lifeStyleState[0].decisionDescription}</p>
          </div>
          <div className="marriage-question">
            <p>If your spouse requested it, would you take a physical exam before marriage?</p>
          </div>
          <div className="marriage-answer">

            {lifeStyleState && lifeStyleState[0].spouseExam === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
            )}

          </div>
          <div className="fav-color-question">
            <p>
              Do you read? What do you read?
              <span>
                <i className="fa fa-minus-circle minus-icon"></i>
              </span>
            </p>
          </div>
          <div className="fav-color-answer">
            {lifeStyleState && lifeStyleState[0].lifestyleReading.status === 'yes' ? (
              <span className="thumbs-up-emoji">👍</span>
            ) : (
              <span className="thumbs-down-emoji">👎︎</span>
            )}

            <p>{lifeStyleState && lifeStyleState[0].lifestyleReading.description}</p>
          </div>
          <div className="fav-color-question">
            <p>Do you have any significant health issues or conditions?</p>
          </div>
          <div className="fav-color-answer">
            <p>{lifeStyleState && lifeStyleState[0].healthIssuesDescription}</p>
          </div>
          <div className="fav-color-question">
            <p>Where does your family live?</p>
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
