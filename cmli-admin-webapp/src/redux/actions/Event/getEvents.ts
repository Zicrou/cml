import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { GetEventProps } from "../../../types"
export const GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
export const GET_EVENTS_ERROR = "GET_EVENTS_ERROR";
export const GET_EVENTS_REQUEST = "GET_EVENTS_REQUEST ";

export const getEvents = (event: GetEventProps) => (dispatch: any) => {
  dispatch({ type: GET_EVENTS_REQUEST });
  const EventsDetail: any[] = [];
  let tracker = 0;
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events?status=${event.eventStatus}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: any) => {
      if (response && response.data.items.length) {
        for (let i = 0; i < response.data.items.length; i++) {
          let eventId = response.data.items[i].sys.id;
          axios({
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/event_members`,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "access-token": readLocalStorage("access-token"),
            },
          })
            .then((responses: any) => {
              dispatch({ type: GET_EVENTS_REQUEST });
              let men: string[] = [];
              let women: string[] = [];
              let temp_obj: any = {};
              tracker += 1;
              if (responses && responses.data.items.length) {
                for (let i = 0; i < responses.data.items.length; i++) {
                  if (responses.data.items[i].lookingFor === "wife") {
                    men.push("men");
                  } else if (responses.data.items[i].lookingFor === "husband") {
                    women.push("men");
                  }
                }
              }
              temp_obj.eventData = response.data.items[i];
              temp_obj.eventMembers = { men: men.length, women: women.length };
              EventsDetail.push(temp_obj);
              if (tracker === response.data.items.length) {
                dispatch({
                  type: GET_EVENTS_SUCCESS,
                  payload: EventsDetail,
                });
              }
            })
            .catch((error: { response: any }) => {
              if (error.response.status === 401) {
                dispatch(tokenAuthFailedAction());
              }
            });
          continue;
        }
      } else {
        dispatch({
          type: GET_EVENTS_SUCCESS,
          payload: response,
        });
      }
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_EVENTS_ERROR,
        payload: error,
      });
    });
};
