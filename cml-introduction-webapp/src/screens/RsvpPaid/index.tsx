import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import LogoutButton from '../../components/LogoutButton'
import logo from './logo.png'

const RsvpPaid: React.FC = () => {
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="rsvp-paid-cml-logo">
              <div className="rsvp-paid-logo">
                <Link title="Home" to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="rsvp-paid-title">
              <b>Thank you!</b>
            </div>
            <div className="rsvp-paid-content">
              <p> We&apos;re looking forward to hosting you soon! </p>
              <p>While you&apos;re here, you should ensure your profile is up to date!</p>
            </div>
            <div className="rsvp-profile-btn">
              <Link to="/profile">
                <button>View Profile</button>
              </Link>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  )
}

export default RsvpPaid
