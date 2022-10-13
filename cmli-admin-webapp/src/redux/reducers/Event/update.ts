import {
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_ERROR,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_STATE_CLEAR,
} from "../../actions/Event/update";

const updateEvent = (state = "", action: any) => {
  switch (action.type) {
    case UPDATE_EVENT_SUCCESS:
      return Object.assign({}, action.payload);
    case UPDATE_EVENT_ERROR:
      return action.payload;
    case UPDATE_EVENT_REQUEST:
      return true;
    case UPDATE_EVENT_STATE_CLEAR:
      return "";
    default:
      return state;
  }
};
export default updateEvent;
