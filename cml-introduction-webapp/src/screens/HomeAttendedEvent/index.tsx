import React from 'react'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

const HomeAttendedEvent: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="attended-event-cml-logo">
              <div className="attended-cml-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="attended-event-title">
              <b>Welcome Back!</b>
            </div>
            <div className="attended-event-content">
              <p>
                If you have recently attended a Center for Muslim Life event, click on View Event below to view profiles
                for other attendees. If you would like to see your own profile, click on View Profile to see what it
                looks like to you and what others see.
              </p>
            </div>
            <div className="attended-event-btns">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <div className="attended-view-event-btn">
                    <button>View Event</button>
                    <div className="attended-event-code">
                      <input type="text" placeholder="Event Code" />
                    </div>
                    <input className="go-btn" type="submit" value="Go" />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="attended-view-profile-btn">
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

export default HomeAttendedEvent
