import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import Loader from '../../components/Loader'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import logo from './logo.png'
import PaypalCheckout from '../../screens/PaypalCheckout'
import { showEvent } from '../../redux/actions/Event/show'
import { updateInvitation } from '../../redux/actions/Invitation/update'
import { verifyOrder } from '../../redux/actions/Order/verify'
import { RootState } from '../../redux/reducers/index'

const RsvpYes: React.FC = (props: any) => {
  const { history } = props
  const { eventId, inviteId } = props.match.params
  const dispatch = useDispatch()
  const getEventStatus = useSelector((state: RootState) => state.showEvent)
  const updateInvitationStatus = useSelector((state: RootState) => state.updateInvitation)
  const verifyOrderStatus = useSelector((state: RootState) => state.verifyOrder)
  const [eventFee, setEventFee] = useState('0')
  const [orderStatus, setOrderStatus] = useState(false)
  const [isOrderNotFound, setIsOrderNotFound] = useState(false)
  const [isEventExpired, SetIsEventExpired] = useState(false)
  const [isUpdateInvitation, setIsUpdateInvitation] = useState(false)
  useEffect(() => {
    dispatch(showEvent(eventId))
  }, [dispatch, eventId])

  useEffect(() => {
    if (getEventStatus && getEventStatus.status === 200) {
      if (getEventStatus.data.event === 'expired') {
        SetIsEventExpired(true)
      } else if (getEventStatus && getEventStatus.data.eventType === 'free') {
        dispatch(verifyOrder({ eventId }))
      } else {
        setEventFee(getEventStatus.data.fees)
      }
    }
  }, [getEventStatus, dispatch, eventId])

  useEffect(() => {
    if (verifyOrderStatus && verifyOrderStatus.status === 200) {
      dispatch(
        updateInvitation({
          eventId,
          invitationId: inviteId,
          status: 'yes'
        })
      )
    } else if (verifyOrderStatus && verifyOrderStatus.status === 302) {
      setOrderStatus(true)
    } else if (verifyOrderStatus && verifyOrderStatus.status === 404) {
      setIsOrderNotFound(true)
    }
  }, [verifyOrderStatus, dispatch, eventId, inviteId])

  useEffect(() => {
    if (updateInvitationStatus && updateInvitationStatus.status === 200) {
      history.push('/rsvp-paid')
    } else if (updateInvitationStatus && updateInvitationStatus.status === 422) {
      setIsUpdateInvitation(true)
    }
  }, [updateInvitationStatus, history])
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="rsvp-yes-cml-logo">
              <div className="rsvp-yes-logo">
                <Link title="Home" to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            {getEventStatus === true || updateInvitationStatus === true ? (
              <div className="rsvp-paypal-btn">
                <Loader />
              </div>
            ) : isEventExpired ? (
              <div className="rsvp-yes-content">
                <p>Oops! Event expired</p>
              </div>
            ) : orderStatus ? (
              <div className="rsvp-yes-content">
                <p>You have already joined this event</p>
              </div>
            ) : isOrderNotFound ? (
              <div className="rsvp-yes-content">
                <p>You are not invited to this event.</p>
              </div>
            ) : isUpdateInvitation ? (
              <div className="rsvp-yes-content">
                <p>You are not invited to this event.</p>
              </div>
            ) : (
              <>
                <div className="rsvp-yes-title">
                  <b>Awesome!</b>
                </div>
                <div className="rsvp-yes-content">
                  <p>We&apos;re looking forward to hosting you soon!</p>

                  <p> This event requires a registration fee.</p>

                  <p>Click the button below to pay using PayPal to confirm your place!</p>
                </div>
                <div className="rsvp-paypal-btn">
                  <button>
                    <PaypalCheckout eventFee={eventFee} eventId={eventId} inviteId={inviteId} history={history} />
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </>
  )
}

export default withRouter(RsvpYes)
