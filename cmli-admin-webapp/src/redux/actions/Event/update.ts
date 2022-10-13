import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { UpdateEventProps } from "../../../types"
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_ERROR = "UPDATE_EVENT_ERROR";
export const UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST ";
export const UPDATE_EVENT_STATE_CLEAR = "UPDATE_EVENT_STATE_CLEAR";

export const updateEvent = (event: UpdateEventProps) => (dispatch: any) => {
  const data = new FormData();
  if (event.eventName != "") {
    data.append("event[title]", event.eventName)
  }
  if (event.eventType != "") {
    data.append("event[event_type]", event.eventType)
  }
  if (event.eventFee != "") {
    data.append("event[fees]", event.eventFee);
  }
  if (event.eventDateTime !== "Invalid date") {
    data.append("event[dateTime]", event.eventDateTime)
  }

  if (event.eventAddress != "") {
    data.append("event[addressLocation]", event.eventAddress);
  }

  dispatch({ type: UPDATE_EVENT_REQUEST });
  return axios({
    method: "put",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${event.eventId}`,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: UPDATE_EVENT_ERROR,
        payload: error,
      });
    });
};

export const clearEventState = () => (dispatch: any) => {
  dispatch({ type: UPDATE_EVENT_STATE_CLEAR });
};
