import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
export const GET_INVITES_SUCCESS = "GET_INVITES_SUCCESS";
export const GET_INVITES_ERROR = "GET_INVITES_ERROR";
export const GET_INVITES_REQUEST = "GET_INVITES_REQUEST ";

export const getInvites = (eventId: string) => (dispatch: any) => {
  dispatch({ type: GET_INVITES_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/invitations`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: GET_INVITES_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_INVITES_ERROR,
        payload: error,
      });
    });
};
