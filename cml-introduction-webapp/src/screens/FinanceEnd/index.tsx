import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const FinanceEnd: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="cml-logo-title">
              <div className="finance-end-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="finance-end-header-text">
              <div className="finance-end-heading-1">
                <b>Congratulations!</b>
              </div>
              <div className="finance-end-sub-heading-1">
                <p>
                  You just completed the finance section of the compatibility quiz! There are two more sections of the
                  quiz. You can complete them now or return later to complete them.
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="progress finance-end-progress">
                <div
                  className="finance-end-progress-bar"
                  id="myBar"
                  role="progressbar"
                  aria-valuenow={70}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
                <div className="finance-end-headings">
                  <div className="finance-progress-text1">Lifestyle</div>
                  <div className="finance-progress-text2">Relationship</div>
                  <div className="finance-progress-text3">Finance</div>
                  <div className="finance-progress-text4">Children</div>
                  <div className="finance-progress-text5">Personal</div>
                </div>
              </div>
            </div>

            <div className="finance-end-lets-go-btns">
              <a href="/financial-responsibility">
                <input type="button" value="Back" className="back-button-style1" />
              </a>
              <Link to="children-desired">
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

export default FinanceEnd
