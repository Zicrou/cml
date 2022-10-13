import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
export const SHOW_EVENT_MEMBERS_SUCCESS = "SHOW_EVENT_MEMBERS_SUCCESS";
export const SHOW_EVENT_MEMBERS_ERROR = "SHOW_EVENT_MEMBERS_ERROR";
export const SHOW_EVENT_MEMBERS_REQUEST = "SHOW_EVENT_MEMBERS_REQUEST ";

export const viewEventMembers = (eventId: string) => (dispatch: any) => {
  dispatch({ type: SHOW_EVENT_MEMBERS_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/event_members`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: any) => {
      return dispatch({
        type: SHOW_EVENT_MEMBERS_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: SHOW_EVENT_MEMBERS_ERROR,
        payload: error.response,
      });
    });
};
