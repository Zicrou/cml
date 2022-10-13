import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const EndOfLifeStyle: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="cml-logo-title">
              <div className="end-of-lifestle-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="header-text">
              <div className="end-screen-heading-1">
                <b>Congratulations!</b>
              </div>
              <div className="end-screen-sub-heading-1">
                <p>
                  You just completed the lifestyle section of the compatibility quiz! There are four more sections of
                  the quiz. You can complete them now or return later to complete them.
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="progress lifestyle-endscreen-progress">
                <div
                  className="lifestyle-endscreen-progress-bar"
                  id="myBar"
                  role="progressbar"
                  aria-valuenow={70}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
                <div className="questionnaire-headings">
                  <div className="lifestyle-text">Lifestyle</div>
                  <div className="relationship-text">Relationship</div>
                  <div className="finances-text">Finance</div>
                  <div className="children-text">Children</div>
                  <div className="personal-text">Personal</div>
                </div>
              </div>
            </div>

            <div className="lets-go-btn1">
              <a href="/lifestyle-family">
                <input type="button" value="Back" className="back-button-style1" />
              </a>
              <Link to="/relationship-family">
                <button>Lets Go!</button>
              </Link>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  )
}

export default EndOfLifeStyle
