import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { GetEventExpiredProps } from "../../../types"
export const GET_EVENTS_EXPIRED_SUCCESS = "GET_EVENTS_EXPIRED_SUCCESS";
export const GET_EVENTS_EXPIRED_ERROR = "GET_EVENTS_EXPIRED_ERROR";
export const GET_EVENTS_EXPIRED_REQUEST = "GET_EVENTS_EXPIRED_REQUEST ";

export const getEventsExpired = (event: GetEventExpiredProps) => (dispatch: any) => {
  dispatch({ type: GET_EVENTS_EXPIRED_REQUEST });
  const EventsDetail: any[] = [];
  let eventIds: any[] = [];

  let temp_obj: any = {};

  let arr: any = [];
  axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events?status=${event.eventStatus}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  }).then((response: any) => {
    let tracker = 0;
    let tracker_1 = 0;
    if (response && response.data.items.length) {
      for (let i = 0; i < response.data.items.length; i++) {
        let eventId = response.data.items[i];
        eventIds.push(eventId);
      }
    } else {
      dispatch({
        type: GET_EVENTS_EXPIRED_SUCCESS,
        payload: response,
      });
    }

    for (let n = 0; n < eventIds.length; n++) {
      let eventInfo = "";
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventIds[n].sys.id}/event_members`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "access-token": readLocalStorage("access-token"),
        },
      }).then((responses: any) => {
        tracker += 1;
        let men: string[] = [];
        let women: string[] = [];
        if (responses && responses.data.items.length) {
          for (let j = 0; j < responses.data.items.length; j++) {
            if (responses.data.items[j].lookingFor === "wife") {
              men.push("men");
            } else if (responses.data.items[j].lookingFor === "husband") {
              women.push("men");
            }
          }
        }
        eventInfo = eventIds[n];
        temp_obj.eventData = eventInfo;
        temp_obj.eventMembers = { men, women };
        arr.push({ eventData: eventInfo, eventMembers: { men, women } });
        if (tracker === eventIds.length) {
          for (let l = 0; l < eventIds.length; l++) {
            axios({
              method: "get",
              url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventIds[l].sys.id}/invitations`,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "access-token": readLocalStorage("access-token"),
              },
            })
              .then((responsesInvites: any) => {
                tracker_1 += 1;
                let menInvited: string[] = [];
                let womenInvited: string[] = [];

                if (responsesInvites && responsesInvites.data.items.length) {
                  for (let k = 0; k < responsesInvites.data.items.length; k++) {
                    if (responsesInvites.data.items[k].lookingFor === "wife") {
                      menInvited.push("men");
                    } else if (
                      responsesInvites.data.items[k].lookingFor === "husband"
                    ) {
                      womenInvited.push("men");
                    }
                  }
                }
                for (let h = 0; h < arr.length; h++) {
                  if (arr[h].eventData.sys.id === eventIds[l].sys.id) {
                    let temp_index = arr[h];
                    temp_index.invitedEventMembers = {
                      menInvited,
                      womenInvited,
                    };
                    EventsDetail.push(temp_index);
                    if (tracker_1 === eventIds.length) {
                      dispatch({
                        type: GET_EVENTS_EXPIRED_SUCCESS,
                        payload: EventsDetail,
                      });
                    }
                  }
                }
              })
              .catch((error: { response: any }) => {
                if (error.response.status === 401) {
                  dispatch(tokenAuthFailedAction());
                }
              });
          }
        }
      });
    }
  });
};
