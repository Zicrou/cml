import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Header from "../../components/Header";
import EventListing from "../EventListing";
import CreateEvent from "../CreateEvent";
import InvitePeople from "../InvitePeople";
import UnInvitePeople from "../UnInvitePeople";
import SendInvitation from "../SendInvitation";
import ViewPastEvent from "../ViewPastEvent";
import ViewUpcomingEvent from "../ViewUpcomingEvent";
import PeopleListing from "../PeopleListing";
import ViewProfile from "../ViewProfile";
import UpdateEvent from "../UpdateEvent"

const App: React.FC = () => {
 
  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="row">
          <div className="col-md-2 col-sm-10 col-lg-2">
          </div>
          <div className="col-md-10 col-sm-12 col-lg-10">
            <Router>
              <Switch>
                <Route path="/event-listing" component={EventListing} />
                <Route path="/create-event" component={CreateEvent} />
                <Route
                  path="/:eventId/invite-people"
                  component={InvitePeople}
                />
                 <Route
                  path="/:eventId/invite-more-people"
                  component={UnInvitePeople}
                />
                <Route
                  path="/send-invitation/:eventId"
                  component={SendInvitation}
                />
                <Route path="/past-event/:eventId" component={ViewPastEvent} />
                <Route path="/upcoming-event/:eventId/edit" component={UpdateEvent} />
                <Route
                  path="/upcoming-event/:eventId"
                  component={ViewUpcomingEvent}
                />
                <Route path="/people-listing" component={PeopleListing} />
                <Route path="/profile/:userId" component={ViewProfile} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(App);
