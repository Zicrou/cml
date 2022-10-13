import {
  GET_EVENTS_EXPIRED_SUCCESS,
  GET_EVENTS_EXPIRED_ERROR,
  GET_EVENTS_EXPIRED_REQUEST,
} from "../../actions/Event/getEventsExpired";

const getEventExpired = (state = "", action: any) => {
  switch (action.type) {
    case GET_EVENTS_EXPIRED_SUCCESS:
      return action.payload;

    case GET_EVENTS_EXPIRED_ERROR:
      return action.payload;

    case GET_EVENTS_EXPIRED_REQUEST:
      return true;

    default:
      return state;
  }
};
export default getEventExpired;
