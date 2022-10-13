import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { InviteProps } from "../../../types";
export const CREATE_INVITE_SUCCESS = "CREATE_INVITE_SUCCESS";
export const CREATE_INVITE_ERROR = "CREATE_INVITE_ERROR";
export const CREATE_INVITE_REQUEST = "CREATE_INVITE_REQUEST ";
export const CREATE_INVITE_STATE_CLEAR = "CREATE_INVITE_STATE_CLEAR";

export const createInvite = (invite: InviteProps) => (dispatch: any) => {
  const data = new FormData();
  data.append("invitation[email]", invite.userEmail);
  data.append("invitation[event_date_time]", invite.eventDateTime);
  if (invite.subject && invite.body) {
    data.append("invitation[subject]", invite.subject);
    data.append("invitation[body]", invite.body);
  }
  dispatch({ type: CREATE_INVITE_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${invite.eventId}/invitations`,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: CREATE_INVITE_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: CREATE_INVITE_ERROR,
        payload: error,
      });
    });
};

export const clearInviteState = () => (dispatch: any) => {
  dispatch({ type: CREATE_INVITE_STATE_CLEAR });
};
