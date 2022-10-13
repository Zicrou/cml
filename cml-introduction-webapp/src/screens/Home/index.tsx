import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { verifyEvent, resetEvent } from '../../redux/actions/Event/verify'
import { showDemographic } from '../../redux/actions/demographics/show'
import { RootState } from '../../redux/reducers/index'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import logo from './logo.png'
import LogoutButton from '../../components/LogoutButton'
import { getInvitation } from '../../redux/actions/Invitation/get'
import './style.css'

const HomeScreen: React.FC = (props: any) => {
  const { history } = props
  const dispatch = useDispatch()
  const [verifyEventFlag, setVerifyEventFlag] = useState(false)
  const [message, setMessage] = useState<any | null>(null)
  const verifyEventStatus = useSelector((state: RootState) => state.verifyEvent)
  const showDemographicStatus = useSelector((state: RootState) => state.showDemographic)
  const getInvitationStatus = useSelector((state: RootState) => state.getInvitation)

  useEffect(() => {
    dispatch(showDemographic())
  }, [dispatch])

  useEffect(() => {
    if (verifyEventStatus && verifyEventStatus.status === 200) {
      if (verifyEventStatus.data.items.length) {
        const eventId = verifyEventStatus.data.items[0].sys.id
        if (verifyEventStatus.data.items[0].event === 'expired') {
          setMessage('Event Expired')
        } else {
          dispatch(getInvitation(eventId))
        }
      } else if (verifyEventStatus.data.items.length <= 0) {
        setMessage('Invalid event code')
      }
    }
  }, [verifyEventStatus, history])

  useEffect(() => {
    if (getInvitationStatus && getInvitationStatus.status === 200) {
      const data = getInvitationStatus.data[0]
      if (data.status == 'yes') {
        history.push(`/event/${data.eventId}/details`)
      } else {
        setMessage('Invalid event code')
      }
    }
  }, [getInvitationStatus])

  const onSubmit = (event: any) => {
    event.preventDefault()
    setMessage('')
    const formData: any = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries())
    if (formDataObj.eventCode) {
      dispatch(verifyEvent(formDataObj.eventCode))
    }
  }
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="home-cml-logo">
              <div className="home-logo">
                <img src={logo} alt="" />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="home-title">
              <b>Welcome Back!</b>
            </div>
            <div className="home-content">
              <p>
                If you have recently attended a Center for Muslim Life event, click on View Event below to view profiles
                for other attendees. If you would like to see your own profile, click on View Profile to see what it
                looks like to you and what others see.
              </p>
            </div>
            <div className="home-btns">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  {verifyEventFlag ? (
                    <div className="attended-view-event-btn">
                      <button>View Event</button>
                      <Form onSubmit={onSubmit}>
                        <div className="attended-event-code">
                          <input type="text" placeholder="Event Code" name="eventCode" />
                        </div>
                        {verifyEventStatus === true ? (
                          <div className="go-btn">
                            <Loader />
                          </div>
                        ) : (
                          <>
                            <p className="error-text">{message}</p>
                            <input className="go-btn" type="submit" value="Go" />
                          </>
                        )}
                      </Form>
                    </div>
                  ) : (
                    <div
                      className="home-view-event-btn"
                      onClick={() => {
                        setVerifyEventFlag(true)
                      }}
                    >
                      <button type="submit">View Event</button>
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <div className="home-view-profile-btn">
                    {showDemographicStatus === true ? (
                      <div className="go-btn">
                        <Loader />
                      </div>
                    ) : showDemographicStatus && showDemographicStatus.status === 200 ? (
                      <Link to="/profile" replace>
                        <button>View Profile</button>
                      </Link>
                    ) : showDemographicStatus && showDemographicStatus.status === 404 ? (
                      <Link to="/demographics" replace>
                        <button>Complete you profile</button>
                      </Link>
                    ) : null}
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

export default HomeScreen
