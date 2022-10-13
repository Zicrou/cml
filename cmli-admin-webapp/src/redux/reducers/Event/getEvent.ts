import {
  GET_EVENT_SUCCESS,
  GET_EVENT_ERROR,
  GET_EVENT_REQUEST,
} from "../../actions/Event/getEventPast";

const getEvent = (state = "", action: any) => {
  switch (action.type) {
    case GET_EVENT_SUCCESS:
      return action.payload;

    case GET_EVENT_ERROR:
      return action.payload;

    case GET_EVENT_REQUEST:
      return true;

    default:
      return state;
  }
};
export default getEvent;
