import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { Link } from 'react-router-dom'
import { updateInvitation } from '../../redux/actions/Invitation/update'
import { verifyOrder } from '../../redux/actions/Order/verify'
import { RootState } from '../../redux/reducers/index'
import LogoutButton from '../../components/LogoutButton'
import './style.css'
import logo from './logo.png'
import { getInvitation } from '../../redux/actions/Invitation/get'
import { deleteInvitation } from '../../redux/actions/Invitation/delete'

const RsvpNo: React.FC = (props: any) => {
  const { eventId, inviteId } = props.match.params
  const dispatch = useDispatch()
  const updateInvitationStatus = useSelector((state: RootState) => state.updateInvitation)
  const [orderStatus, setOrderStatus] = useState(false)
  const [isOrderNotFound, setIsOrderNotFound] = useState(false)
  const getInvitationStatus = useSelector((state: RootState) => state.getInvitation)

  useEffect(() => {
    dispatch(getInvitation(eventId))
  }, [dispatch, eventId])

  useEffect(() => {
    if (getInvitationStatus && getInvitationStatus.status === 200) {
      const data = getInvitationStatus.data[0]
      if (data.status == 'yes') {
        dispatch(deleteInvitation(eventId))
      }
      dispatch(
        updateInvitation({
          eventId,
          invitationId: inviteId,
          status: 'no'
        })
      )
    }
  }, [getInvitationStatus])

  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-8">
            <div className="rsvp-no-cml-logo">
              <div className="rsvp-no-logo">
                <Link title="Home" to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>

            {updateInvitationStatus === true ? (
              <div className="rsvp-no-content">
                <Loader />
              </div>
            ) : orderStatus ? (
              <div className="rsvp-no-content">
                <p>You have already joined this event</p>
              </div>
            ) : isOrderNotFound ? (
              <div className="rsvp-no-content">
                <p>You are not invited to this event.</p>
              </div>
            ) : (
              <>
                <div className="rsvp-no-title">
                  <b>Bummer!</b>
                </div>
                <div className="rsvp-no-content">
                  <p>We&apos;re sorry you can&apos;t make it to this event! </p>
                  <p>To help us out, could you</p>
                </div>
                <div className="rsvp-profile-btn">
                  <Link to="/profile">
                    <button>View Profile</button>
                  </Link>
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

export default RsvpNo
