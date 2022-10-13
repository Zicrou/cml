import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { UpdateInviteProps } from "../../../types";
export const UPDATE_INVITES_SUCCESS = "UPDATE_INVITES_SUCCESS";
export const UPDATE_INVITES_ERROR = "UPDATE_INVITES_ERROR";
export const UPDATE_INVITES_REQUEST = "UPDATE_INVITES_REQUEST ";
export const UPDATE_INVITES_STATE_CLEAR = "UPDATE_INVITES_STATE_CLEAR";

export const updateInvites = (invite: UpdateInviteProps) => (dispatch: any) => {
  dispatch({ type: UPDATE_INVITES_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${invite.eventId}/invitation_updates`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: UPDATE_INVITES_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: UPDATE_INVITES_ERROR,
        payload: error,
      });
    });
};

export const clearUpdateInviteState = () => (dispatch: any) => {
  dispatch({ type: UPDATE_INVITES_STATE_CLEAR });
};
