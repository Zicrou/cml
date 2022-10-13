import React from 'react';
import './style.css'
interface Props {
  width: string
}
const ProgressBar: React.FC<Props> = (props: {width:string}) => {
    const widthVal = props.width;  
  return (
<>
         <div className="progress-main">
          <div
            className="custom-progress-bar"
            id="myBar"
            role="progressbar"
            style={{width:`${widthVal}%`}}
          ></div>
        </div>
 </> 
  )

}

export default ProgressBar;