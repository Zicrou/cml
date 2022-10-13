import {
  CREATE_INVITE_SUCCESS,
  CREATE_INVITE_ERROR,
  CREATE_INVITE_REQUEST,
  CREATE_INVITE_STATE_CLEAR,
} from "../../actions/Invite/create";

const createInvite = (state = "", action: any) => {
  switch (action.type) {
    case CREATE_INVITE_SUCCESS:
      return Object.assign({}, action.payload);

    case CREATE_INVITE_ERROR:
      return action.payload;

    case CREATE_INVITE_REQUEST:
      return true;
    case CREATE_INVITE_STATE_CLEAR:
      return "";
    default:
      return state;
  }
};
export default createInvite;
