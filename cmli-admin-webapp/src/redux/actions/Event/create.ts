import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { CreateEventProps } from "../../../types";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_ERROR = "CREATE_EVENT_ERROR";
export const CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST ";

export const CREATE_EVENT_STATE_CLEAR = "CREATE_EVENT_STATE_CLEAR";



export const createEvent = (event: CreateEventProps) => (dispatch: any) => {
  const data = new FormData();
  data.append("event[title]", event.eventName);
  data.append("event[dateTime]", event.eventDateTime);
  data.append("event[addressLocation]", event.eventAddress);
  data.append("event[fees]", event.eventFee);
  data.append("event[event_type]", event.eventType);
  dispatch({ type: CREATE_EVENT_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events`,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: CREATE_EVENT_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: CREATE_EVENT_ERROR,
        payload: error,
      });
    });
};

export const clearEventState = () => (dispatch: any) => {
  dispatch({ type: CREATE_EVENT_STATE_CLEAR });
};
