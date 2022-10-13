import React from 'react'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const HomeDisabled: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="account-disabled-cml-logo">
              <div className="disabled-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="account-disabled-title">
              <b>Account Disabled!</b>
            </div>
            <div className="account-disabled-content">
              <p>Your account has been disabled.</p>
              <p> Please contact help@cml.org for more information.</p>
            </div>
            <div className="account-disabled-btns">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <div className="account-disabled-view-event-btn">
                    <button>View Event</button>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="account-disabled-view-profile-btn">
                    <button>View Profile</button>
                  </div>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  )
}

export default HomeDisabled
