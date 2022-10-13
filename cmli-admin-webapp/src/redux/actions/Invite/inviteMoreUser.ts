import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { userProps } from "../../../types";
export const GET_INVITE_MORE_USER_SUCCESS = "GET_INVITE_MORE_USER_SUCCESS";
export const GET_INVITE_MORE_USER_ERROR = "GET_INVITE_MORE_USER_ERROR";
export const GET_INVITE_MORE_USER_REQUEST = "GET_INVITE_MORE_USER_REQUEST ";

export const inviteMoreUser = (eventId: string,filter: userProps) => (dispatch: any) => {
  dispatch({ type: GET_INVITE_MORE_USER_REQUEST });
  return axios({
    method: "get",
    url: filter.status
      ? `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/invite_more_user?${filter.url}`
      : `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/invite_more_user`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: GET_INVITE_MORE_USER_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_INVITE_MORE_USER_ERROR,
        payload: error,
      });
    });
};
