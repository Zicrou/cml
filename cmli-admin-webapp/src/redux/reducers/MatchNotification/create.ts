import {
  SEND_MATCH_SUCCESS,
  SEND_MATCH_ERROR,
  SEND_MATCH_REQUEST,
  SEND_MATCH_STATE_CLEAR,
} from "../../actions/MatchNotification/create";

const sendNoitfication = (state = "", action: any) => {
  switch (action.type) {
    case SEND_MATCH_SUCCESS:
      return Object.assign({}, action.payload);

    case SEND_MATCH_ERROR:
      return action.payload;

    case SEND_MATCH_REQUEST:
      return true;

    case SEND_MATCH_STATE_CLEAR:
      return "";

    default:
      return state;
  }
};
export default sendNoitfication;
