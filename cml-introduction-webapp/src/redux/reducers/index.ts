import { combineReducers } from 'redux'
import createLifeStyleHealth from './lifeStyleHealth/create'
import createLifeStyleHobbies from './lifeStyleHobbies/create'
import createLifeStyleTravel from './lifeStyleTravel/create'
import createChildrenDesired from './childrenDesired/create'
import createLifeStyleDecision from './lifeStyleDecision/create'
import createLifeStyleFamily from './lifeStyleFamily/create'
import createLifeStylePhysicalExam from './lifeStylePysicalExam/create'
import createLifeStyleReading from './lifeStyleReading/create'
import createChildrenExisting from './childrenExisting/create'
import createRelationShipMarriage from './RelationShipMarriage/create'
import createRelationShipLanguage from './RelationShipLangugae/create'
import createRelationShipExpectation from './RelationShipExpectation/create'
import createRelationShipSpiritualContribution from './RelationshipSpiritualContribution/create'
import createRelationShipQuality from './RelationShipQuality/create'
import createRelationShipFamily from './RelationshipFamily/create'
import createFinanceDefiningWealth from './FinanceDefiningWealth/create'
import createFinanceDefiningResponsibility from './FinanceDefiningResponsibility/create'
import createFinanceExpectation from './FinanceExpectation/create'
import createFinanceWorkingWife from './FinanceWorkingWife/create'
import createFinanceDebt from './FinanceDebt/create'
import createFinancialDependent from './FinancialDependent/create'
import createDemographics from './demographics/create'
import showDemographic from './demographics/show'
import createRelationShipLivingSituation from './relationshipLivingSituation/create'
import getAnswers from './answers/show'
import getUserAnswer from './answers/getUserAnswer'
import getAnswerBack from './answers/getAnswerBack'
import showEvent from './Event/show'
import verifyOrder from './Order/verify'
import updateInvitation from './Invitation/update'
import verifyEvent from './Event/verify'
import viewEventMembers from './Event/viewMembers'
import createInterestPreference from './InterestPreference/create'
import deleteInterestPreference from './InterestPreference/delete'
import getInterestPreferences from './InterestPreference/getInterests'
import getMe from './Me/getMe'
import auth from './Auth/handleUnauthorizedRoutesReducer'
import updateAnswer from './answers/update'
import updateDemographics from './demographics/update'
import getInvitation from './Invitation/get'
import deleteInvitation from './Invitation/delete'

export const rootReducer = combineReducers({
  createLifeStyleHobbies,
  createLifeStyleTravel,
  createLifeStyleHealth,
  createChildrenDesired,
  createLifeStyleDecision,
  createLifeStyleFamily,
  createLifeStylePhysicalExam,
  createLifeStyleReading,
  createChildrenExisting,
  createRelationShipMarriage,
  createRelationShipLanguage,
  createRelationShipExpectation,
  createRelationShipSpiritualContribution,
  createRelationShipQuality,
  createDemographics,
  showDemographic,
  createFinanceDefiningWealth,
  createFinanceDefiningResponsibility,
  createFinanceExpectation,
  createFinanceWorkingWife,
  createFinanceDebt,
  createFinancialDependent,
  createRelationShipFamily,
  createRelationShipLivingSituation,
  getAnswers,
  showEvent,
  verifyOrder,
  updateInvitation,
  verifyEvent,
  viewEventMembers,
  createInterestPreference,
  deleteInterestPreference,
  getInterestPreferences,
  getMe,
  auth,
  updateAnswer,
  updateDemographics,
  getUserAnswer,
  getAnswerBack,
  getInvitation,
  deleteInvitation
})

export type RootState = ReturnType<typeof rootReducer>
