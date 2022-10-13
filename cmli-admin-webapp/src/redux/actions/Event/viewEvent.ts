import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
export const VIEW_EVENT_SUCCESS = "VIEW_EVENT_SUCCESS";
export const VIEW_EVENT_ERROR = "VIEW_EVENT_ERROR";
export const VIEW_EVENT_REQUEST = "VIEW_EVENT_REQUEST ";

export const viewEvent = (EventProps: any) => (dispatch: any) => {
  dispatch({ type: VIEW_EVENT_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${EventProps}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: any) => {
      return dispatch({
        type: VIEW_EVENT_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: VIEW_EVENT_ERROR,
        payload: error.response,
      });
    });
};
