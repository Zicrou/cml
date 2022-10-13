import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { MatchEventProps } from "../../../types"
export const SEND_MATCH_SUCCESS = "SEND_MATCH_SUCCESS";
export const SEND_MATCH_ERROR = "SEND_MATCH_ERROR";
export const SEND_MATCH_REQUEST = "SEND_MATCH_REQUEST ";
export const SEND_MATCH_STATE_CLEAR = "SEND_MATCH_STATE_CLEAR";

export const sendNoitfication = (match: MatchEventProps) => (dispatch: any) => {
  const data = new FormData();
  data.append(
    "match_notification[notified_membership_id]",
    match.notifiedMemberId
  );
  data.append("match_notification[email_subject]", match.subject);
  data.append("match_notification[email_message]", match.message);
  data.append("match_notification[matched_membership_id]", match.matchId);

  dispatch({ type: SEND_MATCH_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${match.eventId}/match_notification`,
    data: data,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: SEND_MATCH_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      return dispatch({
        type: SEND_MATCH_ERROR,
        payload: error,
      });
    });
};

export const clearMatchState = () => (dispatch: any) => {
  dispatch({ type: SEND_MATCH_STATE_CLEAR });
};
