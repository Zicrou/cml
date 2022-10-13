import { combineReducers } from "redux";
import setSession from "./Session";
import createEvent from "./Event/create";
import createInvite from "./Invite/create";
import getUsers from "./User/getUsers";
import getEvents from "./Event/getEvents";
import viewEventMembers from "./Event/getEventMembers";
import getEventExpired from "./Event/getEventsExpired";
import getEvent from "./Event/getEvent";
import auth from "./Auth/handleUnauthorizedRoutesReducer";
import sendNoitfication from "./MatchNotification/create";
import getInvites from "./Invite/getInvites";
import inviteMoreUser from "./Invite/inviteMoreUser";
import updateInvites from "./Invite/updateinvites";
import showDemographic from "./Demographics/show";
import getAnswers from "./Answers/get";
import generatePDF from "./GeneratePdf/generatePdf";
import viewEvent from "./Event/viewEvent";
import updateEvent from "./Event/update";

export const rootReducer = combineReducers({
  setSession,
  createEvent,
  updateEvent,
  createInvite,
  getUsers,
  getEvents,
  viewEvent,
  viewEventMembers,
  getEventExpired,
  getEvent,
  auth,
  sendNoitfication,
  getInvites,
  updateInvites,
  showDemographic,
  getAnswers,
  generatePDF,
  inviteMoreUser
});
export type RootState = ReturnType<typeof rootReducer>;
