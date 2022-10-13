import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import logo from './logo.png'

const Welcome: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="cml-logo-title">
              <div className="welcome-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="header-text">
              <div className="sub-heading4">
                <b>Welcome to the Center for Muslim Life!</b>
              </div>
              <div className="sub-heading5">
                <p>
                  Before we can invite you to our events, lets set up your compatibility profile. This will help
                  prospective spouses see whether you two align with each other before moving forward.
                </p>
                <p>
                  Some of the questions you will be answering will be confidential. These will be marked with a lock
                  symbol
                  <span>
                    <i className="fa fa-lock welcome-lock-icon"></i>
                  </span>{' '}
                  and only you will be able to see your answers to these questions.
                </p>
                <p>
                  This will take approximately 30 minutes to an hour depending on how detailed you are. Your prospective
                  spouse will immensely appreciate all the details you can provide!
                </p>
              </div>
              <div className="quiz-btn1">
                <Link to="/lifestyle-hobbies">
                  <button>Start Compatibility Quiz</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </>
  )
}

export default Welcome
