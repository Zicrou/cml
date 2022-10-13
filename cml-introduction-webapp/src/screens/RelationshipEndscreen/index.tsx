import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const RelationShipEnd: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <div className="cml-logo-title">
              <div className="relationship-end-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="relationship-end-header-text">
              <div className="relationship-end-heading-1">
                <b>Congratulations!</b>
              </div>
              <div className="relationship-end-sub-heading-1">
                <p>
                  You just completed the relationship section of the compatibility quiz! There are three more sections
                  of the quiz. You can complete them now or return later to complete them.
                </p>
              </div>
            </div>
            <div className="container-fluid">
              <div className="progress relationship-end-progress">
                <div
                  className="relationship-end-progress-bar"
                  id="myBar"
                  role="progressbar"
                  aria-valuenow={70}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
                <div className="relationship-end-headings">
                  <div className="relationship-progress-text1">Lifestyle</div>
                  <div className="relationship-progress-text2">Relationship</div>
                  <div className="relationship-progress-text3">Finance</div>
                  <div className="relationship-progress-text4">Children</div>
                  <div className="relationship-progress-text5">Personal</div>
                </div>
              </div>
            </div>

            <div className="relationship-end-lets-go-btns">
              <a href="/relationship-marriage">
                <input type="button" value="Back" className="back-button-style1" />
              </a>
              <Link to="/financial-expectation">
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

export default RelationShipEnd
