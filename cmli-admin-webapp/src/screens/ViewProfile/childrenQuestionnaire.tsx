import React from 'react';
import { ChlidrenQuestionnaireProps } from "../../types"

const ChildrenQuestionnaire: React.FC<ChlidrenQuestionnaireProps> = (props: ChlidrenQuestionnaireProps) => {
  const childrenState = props.childrenState
  return (
    <>
      {childrenState && childrenState.length ? (
        <div>
          <div className="travel-question">
            <p> Do you want children?</p>
          </div>
          <div className="marriage-answer">
            
              {childrenState && childrenState[0].childrenDesired.status === 'yes' ? (
           <span className="thumbs-up-emoji">👍</span>
           ) : (
             <span className="thumbs-down-emoji">👎︎</span>
              )}
            
            <p>{childrenState && childrenState[0].childrenDesired.description}</p>
          </div>

          <div className="travel-question">
            <p>Do you have children now? If yes, please describe your relationship with them and their parents.</p>
          </div>
          <div className="marriage-answer">
            
              {childrenState && childrenState[0].childrenExist.status === 'yes' ? (
               <span className="thumbs-up-emoji">👍</span>
               ) : (
                 <span className="thumbs-down-emoji">👎︎</span>
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
