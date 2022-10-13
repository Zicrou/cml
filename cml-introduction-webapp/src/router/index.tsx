import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './privateRoute'
import SignUp from '../screens/Signup'
import Login from '../screens/Login'
import EventDetails from '../screens/EventDetails'
import LifeStyleHobbies from '../screens/LifeStyleHobbies'
import LifeStyleTravel from '../screens/LifeStyleTravel'
import LifeStyleReading from '../screens/LifeStyleReading'
import LifeStyleDecision from '../screens/LifeStyleDecision'
import LifeStyleFamily from '../screens/LifeStyleFamily'
import LifeStyleHealth from '../screens/LifeStyleHealth'
import LifeStylePhysicalExam from '../screens/LifeStyleHealthPysicalExam'
import EndOfLifeStyle from '../screens/EndOfLifeStyle'
import RelationShipExpectation from '../screens/RelationShipExpectation'
import RelationShipLanguage from '../screens/RelationShipLanguage'
import RelationShipMarriage from '../screens/RelationShipMarriage'
import RelationShipQualities from '../screens/RelationShipQualities'
import RelationshipEndscreen from '../screens/RelationshipEndscreen'
import RelationshipSpiritualContribution from '../screens/RelationshipSpiritualContribution'
import FinancialExpectation from '../screens/FinancialExpectation'
import FinanceDebt from '../screens/FinanceDebt'
import FinanceDefiningWealth from '../screens/FinanceDefiningWealth'
import FinanceWorkingWife from '../screens/FinanceWorkingWife'
import FinanceEnd from '../screens/FinanceEnd'
import FinancialDependents from '../screens/FinancialDependents'
import FinancialResponsibility from '../screens/FinancialResponsibility'
import ChildrenDesired from '../screens/ChildrenDesired'
import ChildrenExisting from '../screens/ChildrenExisting'
import ChildrenEnd from '../screens/ChildrenEnd'
import Home from '../screens/Home'
import HomeDisabled from '../screens/HomeDisabled'
import HomeAttendedEvent from '../screens/HomeAttendedEvent'
import WelcomeBack from '../screens/WelcomeBack'
import Welcome from '../screens/Welcome'
import RsvpNo from '../screens/RsvpNo'
import RsvpYes from '../screens/RsvpYes'
import RsvpPaid from '../screens/RsvpPaid'
import PostLogin from '../screens/PostLogin'
import Demographics from '../screens/Demographics'
import UserProfile from '../screens/UserProfile'
import RelationShipFamily from '../screens/RelationshipFamily'
import RelationShipLivingSituation from '../screens/RelationshipLivingSituation'
import DemographicsEdit from '../screens/DemographicsEdit'
import ResetPassword from '../screens/ResetPassword'

const Routers: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ResetPassword} />
          <Route exact path="/post-login" component={PostLogin} />
          <Route exact path="/Signup" component={SignUp} />
          <ProtectedRoute exact path="/event/:eventId/details" component={EventDetails} />
          <ProtectedRoute exact path="/lifestyle-hobbies/:questionId?" component={LifeStyleHobbies} />
          <ProtectedRoute exact path="/lifestyle-travel/:questionId?" component={LifeStyleTravel} />
          <ProtectedRoute exact path="/lifestyle-reading/:questionId?" component={LifeStyleReading} />
          <ProtectedRoute exact path="/lifestyle-decision/:questionId?" component={LifeStyleDecision} />
          <ProtectedRoute exact path="/lifestyle-family/:questionId?" component={LifeStyleFamily} />
          <ProtectedRoute exact path="/lifestyle-health/:questionId?" component={LifeStyleHealth} />
          <ProtectedRoute exact path="/lifestyle-physical-exam/:questionId?" component={LifeStylePhysicalExam} />
          <ProtectedRoute exact path="/end-of-life-style/:questionId?" component={EndOfLifeStyle} />
          <ProtectedRoute exact path="/relationship-expectation/:questionId?" component={RelationShipExpectation} />
          <ProtectedRoute exact path="/relationship-language/:questionId?" component={RelationShipLanguage} />
          <ProtectedRoute exact path="/relationship-marriage/:questionId?" component={RelationShipMarriage} />
          <ProtectedRoute exact path="/relationship-qualities/:questionId?" component={RelationShipQualities} />
          <ProtectedRoute
            exact
            path="/relationship-spiritual-contribution/:questionId?"
            component={RelationshipSpiritualContribution}
          />
          <ProtectedRoute exact path="/relationship-endscreen" component={RelationshipEndscreen} />
          <ProtectedRoute exact path="/financial-expectation/:questionId?" component={FinancialExpectation} />
          <ProtectedRoute exact path="/financial-debt/:questionId?" component={FinanceDebt} />
          <ProtectedRoute exact path="/finance-defining-wealth/:questionId?" component={FinanceDefiningWealth} />
          <ProtectedRoute exact path="/finance-working-wife/:questionId?" component={FinanceWorkingWife} />
          <ProtectedRoute exact path="/finance-end/:questionId?" component={FinanceEnd} />
          <ProtectedRoute exact path="/financial-dependents/:questionId?" component={FinancialDependents} />
          <ProtectedRoute exact path="/financial-responsibility/:questionId?" component={FinancialResponsibility} />
          <ProtectedRoute exact path="/children-desired/:questionId?" component={ChildrenDesired} />
          <ProtectedRoute exact path="/children-existing/:questionId?" component={ChildrenExisting} />
          <ProtectedRoute exact path="/Child-end" component={ChildrenEnd} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/home-disabled" component={HomeDisabled} />
          <ProtectedRoute exact path="/home-attended-event" component={HomeAttendedEvent} />
          <ProtectedRoute exact path="/welcome-back" component={WelcomeBack} />
          <ProtectedRoute exact path="/welcome" component={Welcome} />
          <ProtectedRoute exact path="/rsvp-no/:eventId/invite/:inviteId" component={RsvpNo} />
          <ProtectedRoute exact path="/rsvp-yes/:eventId/invite/:inviteId" component={RsvpYes} />
          <ProtectedRoute exact path="/rsvp-paid" component={RsvpPaid} />
          <ProtectedRoute exact path="/relationship-family/:questionId?" component={RelationShipFamily} />
          <ProtectedRoute exact path="/relationship-living/:questionId?" component={RelationShipLivingSituation} />
          <ProtectedRoute exact path="/demographics" component={Demographics} />
          <ProtectedRoute exact path="/demographics-edit" component={DemographicsEdit} />
          <ProtectedRoute exact path="/profile/:userId?/:eventMembershipId?" component={UserProfile} />
        </Switch>
      </Router>
    </>
  )
}
export default Routers
