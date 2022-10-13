import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showDemographic } from '../../redux/actions/demographics/show'
import { getAnswers } from '../../redux/actions/answers/get'
import { getUserAnswer } from '../../redux/actions/answers/getUserAnswer'
import { createInterestPreference } from '../../redux/actions/InterestPreference/create'
import { deleteInterestPreference } from '../../redux/actions/InterestPreference/delete'
import { getInterestPreferences } from '../../redux/actions/InterestPreference/getInterests'
import { getMe } from '../../redux/actions/Me/getMe'
import Loader from '../../components/Loader'

import { RootState } from '../../redux/reducers/index'
import LifeStyleQuestionnaire from './lifeStyleQuestionnaire'
import ChildrenQuestionnaire from './childrenQuestionnaire'
import RelationshipQuestionnaire from './relationshipQuestionnaire'
import FinanceQuestionnaire from './finaceQuestionnaire'

import getAge from './../../utils/getAge'

import logo from './images/cml-logo.png'
import avatar from './images/avatar.png'
import LogoutButton from '../../components/LogoutButton'
import './style.css'

interface InterestPreferenceProps {
  interestedInId: string
  eventId: string | null
  personId?: string | null
}
const UserProfile: React.FC = (props: any) => {
  const { history } = props
  const { userId } = props.match.params
  const { eventMembershipId } = props.match.params
  const eventId = localStorage.getItem('eventId')
  const dispatch = useDispatch()
  const [isHeartFill, setIsHeartFill] = useState(false)
  const [showUserData, setShowUserData] = useState(true)
  const [showEyeIcon, setShowEyeIcon] = useState(false)
  const [showSimpleEyeIcon, setShowSimpleEyeIcon] = useState(true)
  const showDemographicStatus = useSelector((state: RootState) => state.showDemographic)
  const createInterestPreferenceStatus = useSelector((state: RootState) => state.createInterestPreference)
  const deleteInterestPreferenceStatus = useSelector((state: RootState) => state.deleteInterestPreference)
  const getInterestPreferencesStatus = useSelector((state: RootState) => state.getInterestPreferences)
  const getMeStatus = useSelector((state: RootState) => state.getMe)
  const getAnswersStatus = useSelector((state: RootState) => state.getAnswers)
  const getUserAnswersStatus = useSelector((state: RootState) => state.getUserAnswer)
  const [lifeStyleState, setLifeStyleState] = useState<any | null>(null)
  const [childrenState, setChildrenState] = useState<any | null>(null)
  const [relationshipState, setRelationshipState] = useState<any | null>(null)
  const [financeState, setFinanceState] = useState<any | null>(null)
  const [Flags, setFlags] = useState<any>({ lifestyle: true, relationship: false, finance: false, children: false })
  const [idToDelete, setIdToDelete] = useState<any | null>(null)
  const [currentUserId, setCurrentUserId] = useState()
  const [lifestyleData, setLifestyleData] = useState<any>()
  const [relationshipData, setRelationshipData] = useState<any>()
  const [financeData, setFinanceData] = useState<any>()
  const [childrenData, setChildrenData] = useState<any>()
  const [isOpen, setIsOpen] = useState(false)
  const menuClass = `dropdown-menu${isOpen ? ' show' : ''}`
  const markAsInterested = (params: InterestPreferenceProps) => {
    if (params && idToDelete === null) {
      dispatch(createInterestPreference(params))
    } else if (params && idToDelete != null) {
      params.personId = idToDelete
      dispatch(deleteInterestPreference(params))
    }
  }
  const onclickEditProfile = () => {
    history.push('/demographics-edit')
  }
  const HideUserLockData = () => {
    setShowUserData(false)
    setShowSimpleEyeIcon(false)
    setShowEyeIcon(true)
  }
  const ShowUserLockData = () => {
    setShowUserData(true)
    setShowSimpleEyeIcon(true)
    setShowEyeIcon(false)
  }

  useEffect(() => {
    if (getMeStatus.status === 200) {
      setCurrentUserId(getMeStatus.data)
    }
  }, [getMeStatus])
  useEffect(() => {
    if (createInterestPreferenceStatus && createInterestPreferenceStatus.status === 201) {
      setIdToDelete(createInterestPreferenceStatus.data.sys.id)
      setIsHeartFill(true)
    }
  }, [createInterestPreferenceStatus])

  useEffect(() => {
    if (deleteInterestPreferenceStatus.status === 204) {
      setIsHeartFill(false)
      setIdToDelete(null)
    }
  }, [deleteInterestPreferenceStatus])
  useEffect(() => {
    if (getInterestPreferencesStatus && getInterestPreferencesStatus.status === 200) {
      const items = getInterestPreferencesStatus.data.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].interestedInId == eventMembershipId) {
          setIsHeartFill(true)
          setIdToDelete(items[i].sys.id)
        }
      }
    }
  }, [getInterestPreferencesStatus, eventMembershipId])

  useEffect(() => {
    dispatch(showDemographic(userId))
    dispatch(getAnswers())
    dispatch(getUserAnswer())
    dispatch(getInterestPreferences({ eventId }))
    dispatch(getMe())
  }, [dispatch, eventId, userId])

  localStorage.setItem('uid', userId)

  useEffect(() => {
    if (getAnswersStatus && getAnswersStatus.status === 200) {
      const answersList = getAnswersStatus.data.items
      const lifestyle: any[] = []
      const relationship: any[] = []
      const finance: any[] = []
      const children: any[] = []
      const temp_arr_hobbies = []
      const temp_arr_other_hobbies = []
      const lifestyleTravel = { status: '', description: '' }
      let decision = ''
      let family = ''
      let spouseExam = ''
      let healthIssuesDescription = ''
      const lifestyleReading = { status: '', description: '' }
      const childrenDesired = { status: '', description: '' }
      const childrenExist = { status: '', description: '' }
      let immediateFamily = ''
      let spouseQualities = ''
      let religiousExpectation = ''
      let spiritualContribution = ''
      const interRacialMarriage = { status: '', description: '' }
      const languageDifference = { status: '', description: '' }
      const livingSituation = { status: '', description: '' }
      let financeWealth = ''
      let financeResponsibility = ''
      let financeExpectation = ''
      let financeDebt = ''
      const financeWorkingWife = { status: '', description: '' }
      const financeDependents = { status: '', description: '' }

      for (let i = 0; i < answersList.length; i++) {
        if (answersList[i].questionCategoryId === 1) {
          lifestyle.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 2) {
          relationship.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 3) {
          finance.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 4) {
          children.push(answersList[i])
        }
      }
      setLifestyleData(lifestyle)
      setRelationshipData(relationship)
      setFinanceData(finance)
      setChildrenData(children)
      for (let i = 0; i < lifestyle.length; i++) {
        if (lifestyle[i].questionId === 1 && lifestyle[i].sortId != 6) {
          temp_arr_hobbies.push(lifestyle[i].response)
        } else if (lifestyle[i].questionId === 1 && lifestyle[i].sortId === 6) {
          temp_arr_other_hobbies.push(lifestyle[i].response)
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 1) {
          lifestyleTravel.status = lifestyle[i].response
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 2) {
          lifestyleTravel.description = lifestyle[i].response
        } else if (lifestyle[i].questionId === 4) {
          decision = lifestyle[i].response
        } else if (lifestyle[i].questionId === 7) {
          family = lifestyle[i].response
        } else if (lifestyle[i].questionId === 6) {
          spouseExam = lifestyle[i].response
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 1) {
          lifestyleReading.status = lifestyle[i].response
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 2) {
          lifestyleReading.description = lifestyle[i].response
        } else if (lifestyle[i].questionId === 5) {
          healthIssuesDescription = lifestyle[i].response
        }
      }
      for (let i = 0; i < children.length; i++) {
        if (children[i].questionId === 21 && children[i].sortId === 1) {
          childrenDesired.status = children[i].response
        } else if (children[i].questionId === 21 && children[i].sortId === 2) {
          childrenDesired.description = children[i].response
        } else if (children[i].questionId === 22 && children[i].sortId === 2) {
          childrenExist.description = children[i].response
        } else if (children[i].questionId === 22 && children[i].sortId === 1) {
          childrenExist.status = children[i].response
        }
      }
      for (let i = 0; i < relationship.length; i++) {
        if (relationship[i].questionId === 8) {
          immediateFamily = relationship[i].response
        } else if (relationship[i].questionId === 10) {
          spouseQualities = relationship[i].response
        } else if (relationship[i].questionId === 11) {
          religiousExpectation = relationship[i].response
        } else if (relationship[i].questionId === 12) {
          spiritualContribution = relationship[i].response
        } else if (relationship[i].questionId === 14 && relationship[i].sortId === 1) {
          interRacialMarriage.status = relationship[i].response
        } else if (relationship[i].questionId === 14 && relationship[i].sortId === 2) {
          interRacialMarriage.description = relationship[i].response
        } else if (relationship[i].questionId === 13 && relationship[i].sortId === 1) {
          languageDifference.status = relationship[i].response
        } else if (relationship[i].questionId === 13 && relationship[i].sortId === 2) {
          languageDifference.description = relationship[i].response
        } else if (relationship[i].questionId === 9 && relationship[i].sortId === 1) {
          livingSituation.status = relationship[i].response
        } else if (relationship[i].questionId === 9 && relationship[i].sortId === 2) {
          livingSituation.description = relationship[i].response
        }
      }

      for (let i = 0; i < finance.length; i++) {
        if (finance[i].questionId === 15) {
          financeWealth = finance[i].response
        } else if (finance[i].questionId === 16) {
          financeResponsibility = finance[i].response
        } else if (finance[i].questionId === 17) {
          financeExpectation = finance[i].response
        } else if (finance[i].questionId === 19) {
          financeDebt = finance[i].response
        } else if (finance[i].questionId === 18 && finance[i].sortId === 1) {
          financeWorkingWife.status = finance[i].response
        } else if (finance[i].questionId === 18 && finance[i].sortId === 2) {
          financeWorkingWife.description = finance[i].response
        } else if (finance[i].questionId === 20 && finance[i].sortId === 1) {
          financeDependents.status = finance[i].response
        } else if (finance[i].questionId === 20 && finance[i].sortId === 2) {
          financeDependents.description = finance[i].response
        }
      }

      setLifeStyleState([
        {
          hobbies: temp_arr_hobbies,
          otherHobbies: temp_arr_other_hobbies,
          travel: lifestyleTravel,
          decisionDescription: decision,
          familyDescription: family,
          spouseExam,
          lifestyleReading,
          healthIssuesDescription
        }
      ])
      setChildrenState([
        {
          childrenDesired,
          childrenExist
        }
      ])

      setRelationshipState([
        {
          immediateFamily,
          spouseQualities,
          religiousExpectation,
          spiritualContribution,
          interRacialMarriage,
          languageDifference,
          livingSituation
        }
      ])
      setFinanceState([
        {
          financeWealth,
          financeResponsibility,
          financeExpectation,
          financeDebt,
          financeWorkingWife,
          financeDependents
        }
      ])
    }
  }, [getAnswersStatus])

  useEffect(() => {
    if (getUserAnswersStatus && getUserAnswersStatus.status === 200) {
      const answersList = getUserAnswersStatus.data.items
      const lifestyle: any[] = []
      const relationship: any[] = []
      const finance: any[] = []
      const children: any[] = []
      const temp_arr_hobbies = []
      const temp_arr_other_hobbies = []
      const lifestyleTravel = { status: '', description: '' }
      let decision = ''
      let family = ''
      let spouseExam = ''
      let healthIssuesDescription = ''
      const lifestyleReading = { status: '', description: '' }
      const childrenDesired = { status: '', description: '' }
      const childrenExist = { status: '', description: '' }
      let immediateFamily = ''
      let spouseQualities = ''
      let religiousExpectation = ''
      let spiritualContribution = ''
      const interRacialMarriage = { status: '', description: '' }
      const languageDifference = { status: '', description: '' }
      const livingSituation = { status: '', description: '' }
      let financeWealth = ''
      let financeResponsibility = ''
      let financeExpectation = ''
      let financeDebt = ''
      const financeWorkingWife = { status: '', description: '' }
      const financeDependents = { status: '', description: '' }

      for (let i = 0; i < answersList.length; i++) {
        if (answersList[i].questionCategoryId === 1) {
          lifestyle.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 2) {
          relationship.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 3) {
          finance.push(answersList[i])
        }
        if (answersList[i].questionCategoryId === 4) {
          children.push(answersList[i])
        }
      }
      setLifestyleData(lifestyle)
      setRelationshipData(relationship)
      setFinanceData(finance)
      setChildrenData(children)
      for (let i = 0; i < lifestyle.length; i++) {
        if (lifestyle[i].questionId === 1 && lifestyle[i].sortId != 6) {
          temp_arr_hobbies.push(lifestyle[i].response)
        } else if (lifestyle[i].questionId === 1 && lifestyle[i].sortId === 6) {
          temp_arr_other_hobbies.push(lifestyle[i].response)
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 1) {
          lifestyleTravel.status = lifestyle[i].response
        } else if (lifestyle[i].questionId === 2 && lifestyle[i].sortId === 2) {
          lifestyleTravel.description = lifestyle[i].response
        } else if (lifestyle[i].questionId === 4) {
          decision = lifestyle[i].response
        } else if (lifestyle[i].questionId === 7) {
          family = lifestyle[i].response
        } else if (lifestyle[i].questionId === 6) {
          spouseExam = lifestyle[i].response
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 1) {
          lifestyleReading.status = lifestyle[i].response
        } else if (lifestyle[i].questionId === 3 && lifestyle[i].sortId === 2) {
          lifestyleReading.description = lifestyle[i].response
        } else if (lifestyle[i].questionId === 5) {
          healthIssuesDescription = lifestyle[i].response
        }
      }
      for (let i = 0; i < children.length; i++) {
        if (children[i].questionId === 21 && children[i].sortId === 1) {
          childrenDesired.status = children[i].response
        } else if (children[i].questionId === 21 && children[i].sortId === 2) {
          childrenDesired.description = children[i].response
        } else if (children[i].questionId === 22 && children[i].sortId === 2) {
          childrenExist.description = children[i].response
        } else if (children[i].questionId === 22 && children[i].sortId === 1) {
          childrenExist.status = children[i].response
        }
      }
      for (let i = 0; i < relationship.length; i++) {
        if (relationship[i].questionId === 8) {
          immediateFamily = relationship[i].response
        } else if (relationship[i].questionId === 10) {
          spouseQualities = relationship[i].response
        } else if (relationship[i].questionId === 11) {
          religiousExpectation = relationship[i].response
        } else if (relationship[i].questionId === 12) {
          spiritualContribution = relationship[i].response
        } else if (relationship[i].questionId === 14 && relationship[i].sortId === 1) {
          interRacialMarriage.status = relationship[i].response
        } else if (relationship[i].questionId === 14 && relationship[i].sortId === 2) {
          interRacialMarriage.description = relationship[i].response
        } else if (relationship[i].questionId === 13 && relationship[i].sortId === 1) {
          languageDifference.status = relationship[i].response
        } else if (relationship[i].questionId === 13 && relationship[i].sortId === 2) {
          languageDifference.description = relationship[i].response
        } else if (relationship[i].questionId === 9 && relationship[i].sortId === 1) {
          livingSituation.status = relationship[i].response
        } else if (relationship[i].questionId === 9 && relationship[i].sortId === 2) {
          livingSituation.description = relationship[i].response
        }
      }

      for (let i = 0; i < finance.length; i++) {
        if (finance[i].questionId === 15) {
          financeWealth = finance[i].response
        } else if (finance[i].questionId === 16) {
          financeResponsibility = finance[i].response
        } else if (finance[i].questionId === 17) {
          financeExpectation = finance[i].response
        } else if (finance[i].questionId === 19) {
          financeDebt = finance[i].response
        } else if (finance[i].questionId === 18 && finance[i].sortId === 1) {
          financeWorkingWife.status = finance[i].response
        } else if (finance[i].questionId === 18 && finance[i].sortId === 2) {
          financeWorkingWife.description = finance[i].response
        } else if (finance[i].questionId === 20 && finance[i].sortId === 1) {
          financeDependents.status = finance[i].response
        } else if (finance[i].questionId === 20 && finance[i].sortId === 2) {
          financeDependents.description = finance[i].response
        }
      }

      setLifeStyleState([
        {
          hobbies: temp_arr_hobbies,
          otherHobbies: temp_arr_other_hobbies,
          travel: lifestyleTravel,
          decisionDescription: decision,
          familyDescription: family,
          spouseExam,
          lifestyleReading,
          healthIssuesDescription
        }
      ])
      setChildrenState([
        {
          childrenDesired,
          childrenExist
        }
      ])

      setRelationshipState([
        {
          immediateFamily,
          spouseQualities,
          religiousExpectation,
          spiritualContribution,
          interRacialMarriage,
          languageDifference,
          livingSituation
        }
      ])
      setFinanceState([
        {
          financeWealth,
          financeResponsibility,
          financeExpectation,
          financeDebt,
          financeWorkingWife,
          financeDependents
        }
      ])
    }
  }, [getUserAnswersStatus])
  {
    console.log('lifestyleSate1:', lifeStyleState)
  }
  return (
    <>
      <div className="container-fluid">
        <LogoutButton />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="user-profile-cml-logo">
              <div className="user-profile-logo">
                <Link title="Home" to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="logo-title">
                <b id="user-profile-logo-style">INTRODUCTIONS</b>
              </div>
            </div>
            {showDemographicStatus && showDemographicStatus === true ? (
              <div className="user-profile-loader">
                <Loader />
              </div>
            ) : (
              <div className="card user-profile-card">
                <img
                  className={
                    showDemographicStatus && showDemographicStatus.data.lookingFor === 'husband'
                      ? 'card-img-top'
                      : 'card-img-top-men'
                  }
                  src={
                    showDemographicStatus && showDemographicStatus.data.demographicImage.orignal != 'nil'
                      ? `${process.env.REACT_APP_BACKEND_API_BASE}${showDemographicStatus.data.demographicImage.orignal}`
                      : avatar
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  {userId ? (
                    <div></div>
                  ) : (
                    <div className="eye-icon">
                      <span>
                        {showSimpleEyeIcon ? (
                          <i className="fa fa-eye" id="show-eye-icon" onClick={HideUserLockData}></i>
                        ) : null}
                        {showEyeIcon ? (
                          <i className="fa fa-eye-slash" id="hide-eye-icon" onClick={ShowUserLockData}></i>
                        ) : null}
                      </span>
                    </div>
                  )}
                  <div className="user-title">
                    {showDemographicStatus && showDemographicStatus.data.personName}
                    {userId ? (
                      <div></div>
                    ) : (
                      <a className="editIconOnProfile" href="demographics-edit">
                        <i className="fas fa-edit" id="edit-profile-icon"></i>
                      </a>
                    )}
                  </div>
                  <div className="info-badges">
                    <span className="badge badge-pill badge-info age">
                      {showDemographicStatus && getAge(showDemographicStatus.data.dateOfBirth)}
                    </span>
                    <span className="badge badge-pill badge-info status">
                      {showDemographicStatus.data !== undefined
                        ? showDemographicStatus.data.previouslyMarried === 'no'
                          ? 'Single'
                          : showDemographicStatus.data.previouslyMarried === 'once'
                          ? 'Married'
                          : showDemographicStatus.data.previouslyMarried === 'divorced'
                          ? 'Divorced'
                          : showDemographicStatus.data.previouslyMarried === 'widowed'
                          ? 'Widowed'
                          : ''
                        : ''}
                      {/* {showDemographicStatus.data !== undefined ? showDemographicStatus.data.previouslyMarried ==='no' ? : ""
                      } */}
                    </span>
                    {userId && currentUserId != userId ? (
                      <span
                        className="user-profile-heart-icon"
                        onClick={() => {
                          markAsInterested({ interestedInId: eventMembershipId, eventId })
                        }}
                      >
                        <i className={isHeartFill ? 'fa fa-heart heart-icon6' : 'fa fa-heart-o heart-icon6'}></i>
                      </span>
                    ) : null}
                  </div>

                  {userId ? (
                    <div></div>
                  ) : showUserData ? (
                    <div className="location-badges">
                      <div className="address-badge">{showDemographicStatus && showDemographicStatus.data.address}</div>
                      <div className="phone-badge">{showDemographicStatus && showDemographicStatus.data.telephone}</div>
                      <span>
                        <i className="fa fa-lock user-lock-icon"></i>
                      </span>
                    </div>
                  ) : null}
                  <div
                    className="dropdown custom-dropdown"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(!isOpen)
                    }}
                  >
                    <button
                      className="btn btn-secondary dropdown-toggle menu-btn"
                      type="button"
                      id="dropdownMenuCustomButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                    >
                      {Flags.lifestyle
                        ? 'LifeStyle'
                        : Flags.relationship
                        ? 'Relationship'
                        : Flags.finance
                        ? 'Finance'
                        : Flags.children
                        ? 'Children'
                        : ''}
                    </button>
                    <div className={menuClass} aria-labelledby="dropdownMenuButton">
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setFlags({ lifestyle: true, relationship: false, finance: false, children: false })
                        }}
                      >
                        LifeStyle
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setFlags({ lifestyle: false, relationship: true, finance: false, children: false })
                        }}
                      >
                        Relationship
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setFlags({ lifestyle: false, relationship: false, finance: true, children: false })
                        }}
                      >
                        Finance
                      </a>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setFlags({ lifestyle: false, relationship: false, finance: false, children: true })
                        }}
                      >
                        Children
                      </a>
                    </div>
                  </div>
                  <div className="card-content">
                    {Flags.lifestyle === true ? (
                      <LifeStyleQuestionnaire
                        lifeStyleState={lifeStyleState}
                        update={userId ? false : true}
                        lifestyleData={lifestyleData}
                        showUserData={showUserData}
                        userId={userId}
                        currentUserId={currentUserId}
                      />
                    ) : (
                      ''
                    )}

                    {/* children */}
                    {Flags.children === true ? (
                      <ChildrenQuestionnaire
                        childrenState={childrenState}
                        update={userId ? false : true}
                        childrenData={childrenData}
                      />
                    ) : (
                      ''
                    )}

                    {/* relation ship */}
                    {Flags.relationship === true ? (
                      <RelationshipQuestionnaire
                        relationshipState={relationshipState}
                        update={userId ? false : true}
                        relationshipData={relationshipData}
                      />
                    ) : (
                      ''
                    )}

                    {/* finnace */}
                    {Flags.finance === true ? (
                      <FinanceQuestionnaire
                        financeState={financeState}
                        update={userId ? false : true}
                        financeData={financeData}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  )
}

export default withRouter(UserProfile)
