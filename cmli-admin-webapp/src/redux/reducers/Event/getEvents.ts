import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_ERROR,
  GET_EVENTS_REQUEST,
} from "../../actions/Event/getEvents";

const getEvents = (state = "", action: any) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return action.payload;

    case GET_EVENTS_ERROR:
      return action.payload;

    case GET_EVENTS_REQUEST:
      return true;

    default:
      return state;
  }
};
export default getEvents;
