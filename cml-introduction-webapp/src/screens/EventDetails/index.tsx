import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showEvent } from '../../redux/actions/Event/show'
import { viewEventMembers } from '../../redux/actions/Event/viewMembers'
import { resetState, getInterestPreferences } from '../../redux/actions/InterestPreference/getInterests'
import { getMe } from '../../redux/actions/Me/getMe'
import { RootState } from '../../redux/reducers/index'
import LogoutButton from '../../components/LogoutButton'
import Loader from '../../components/Loader'
import { resetEvent } from '../../redux/actions/Event/verify'
import { convertUNIXString } from './../../utils/convertUNIXTimeStamp'
import getAge from './../../utils/getAge'
import logo from './logo.png'

import './style.css'
const EventDetails: React.FC = (props: any) => {
  const { eventId } = props.match.params
  const { history } = props
  const getEventStatus = useSelector((state: RootState) => state.showEvent)
  const viewEventMembersStatus = useSelector((state: RootState) => state.viewEventMembers)
  const getInterestPreferencesStatus = useSelector((state: RootState) => state.getInterestPreferences)
  const getMeStatus = useSelector((state: RootState) => state.getMe)
  const [userId, setUserId] = useState()
  const [eventMembersList, setEventMembersList] = useState<string[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (eventId) {
      localStorage.setItem('eventId', eventId)
    }
    dispatch(resetState())
  }, [dispatch, eventId])

  useEffect(() => {
    dispatch(showEvent(eventId))
    dispatch(viewEventMembers(eventId))
    dispatch(getInterestPreferences({ eventId }))
    dispatch(getMe())
  }, [dispatch, eventId])

  useEffect(() => {
    if (getMeStatus.status === 200) {
      setUserId(getMeStatus.data)
    }
  }, [getMeStatus])
  useEffect(() => {
    if (userId) {
      let eventMemberShipId = null
      const ids_arr: string[] = []
      if (viewEventMembersStatus && viewEventMembersStatus.data) {
        for (let i = 0; i < viewEventMembersStatus.data.items.length; i++) {
          if (viewEventMembersStatus.data.items[i].sys.id === userId) {
            eventMemberShipId = viewEventMembersStatus.data.items[i].eventMembershipId
            break
          }
        }
      }
      if (eventMemberShipId !== null) {
        if (getInterestPreferencesStatus && getInterestPreferencesStatus.data) {
          for (let i = 0; i < getInterestPreferencesStatus.data.items.length; i++) {
            if (getInterestPreferencesStatus.data.items[i].interestedById === eventMemberShipId) {
              ids_arr.push(getInterestPreferencesStatus.data.items[i].interestedInId)
            }
          }
        }
      }

      if (ids_arr) {
        const membersArray = []
        let flag = true
        if (viewEventMembersStatus && viewEventMembersStatus.data) {
          for (let i = 0; i < viewEventMembersStatus.data.items.length; i++) {
            flag = true
            for (let j = 0; j < ids_arr.length; j++) {
              if (ids_arr[j] === viewEventMembersStatus.data.items[i].eventMembershipId) {
                const item = viewEventMembersStatus.data.items[i]
                item.heart = true
                membersArray.push(item)
                flag = false
              }
            }
            if (flag) {
              const item = viewEventMembersStatus.data.items[i]
              item.heart = false
              membersArray.push(item)
            }
          }
          setEventMembersList(membersArray)
        }
      }
    }
  }, [getInterestPreferencesStatus, viewEventMembersStatus, userId])

  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="cml-logo-title">
              <div className="cml-logo">
                <img
                  src={logo}
                  alt=""
                  onClick={() => {
                    dispatch(resetEvent())
                    history.push('/home')
                  }}
                />
              </div>
              <div className="logo-title">
                <b>INTRODUCTIONS</b>
              </div>
            </div>
            <div className="header-text">
              {getEventStatus === true || viewEventMembersStatus === true ? (
                <div className="sub-heading3">
                  <Loader />
                </div>
              ) : (
                <>
                  <div className="sub-heading1">
                    <b>{getEventStatus && getEventStatus.data ? getEventStatus.data.addressLocation : ''}</b>
                  </div>
                  <div className="sub-heading2">
                    <b>
                      {getEventStatus && getEventStatus.data ? convertUNIXString(getEventStatus.data.dateTime, 1) : ''}
                    </b>
                  </div>
                  <div className="sub-heading3">
                    <p>
                      {getEventStatus && getEventStatus.data
                        ? 'Visible until ' + convertUNIXString(getEventStatus.data.visibleUntil, 0)
                        : ''}
                    </p>
                  </div>
                  {eventMembersList.length ? (
                    eventMembersList.map((user: any) => (
                      <div className="card event-details-card" key={user.sys.id}>
                        <Link to={`/profile/${user && user.sys.id}/${user && user.eventMembershipId}`}>
                          <div className="row custom">
                            <div className="col-md-4">
                              <img
                                src={
                                  user.demographicImage
                                    ? `${process.env.REACT_APP_BACKEND_API_BASE}${user.demographicImage.thumb}`
                                    : ''
                                }
                                className={
                                  user.lookingFor === 'wife'
                                    ? 'rounded-circle'
                                    : user.lookingFor === 'husband'
                                    ? 'rounded-circle pink-border-img'
                                    : 'rounded-circle'
                                }
                                alt=""
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5 className="event-details-card-title">{user.memberName}</h5>
                                <div className="event-details-badges">
                                  <span className="badge badge-pill event-details-badge">
                                    {getAge(user.dateOfBirth)}
                                  </span>
                                  <span className="badge badge-pill event-details-badge">
                                    {user && user.previouslyMarried === 'no'
                                      ? 'Single'
                                      : user.previouslyMarried === 'once'
                                      ? 'Married'
                                      : user.previouslyMarried === 'divorced'
                                      ? 'Divorced'
                                      : user.previouslyMarried === 'widowed'
                                      ? 'Widowed'
                                      : ''}
                                  </span>
                                </div>
                                {user.sys.id != userId ? (
                                  <div className="event-details-heart-icon">
                                    {/* <i className="fa fa-heart-o heart-icon6"></i> */}
                                    <i
                                      className={user.heart ? 'fa fa-heart heart-icon6' : 'fa fa-heart-o heart-icon6'}
                                    ></i>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p>No members</p>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}

export default withRouter(EventDetails)
