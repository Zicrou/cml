import {
  VIEW_EVENT_SUCCESS,
  VIEW_EVENT_ERROR,
  VIEW_EVENT_REQUEST,
} from "../../actions/Event/viewEvent";

const viewEvent = (state = "", action: any) => {
  switch (action.type) {
    case VIEW_EVENT_SUCCESS:
      return action.payload;

    case VIEW_EVENT_ERROR:
      return action.payload;

    case VIEW_EVENT_REQUEST:
      return true;

    default:
      return state;
  }
};
export default viewEvent;
