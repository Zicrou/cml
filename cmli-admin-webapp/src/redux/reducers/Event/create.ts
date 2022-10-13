import {
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_STATE_CLEAR,
} from "../../actions/Event/create";

const createEvent = (state = "", action: any) => {
  switch (action.type) {
    case CREATE_EVENT_SUCCESS:
      return Object.assign({}, action.payload);

    case CREATE_EVENT_ERROR:
      return action.payload;

    case CREATE_EVENT_REQUEST:
      return true;

    case CREATE_EVENT_STATE_CLEAR:
      return "";

    default:
      return state;
  }
};
export default createEvent;
