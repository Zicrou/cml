import {
  UPDATE_INVITES_SUCCESS,
  UPDATE_INVITES_ERROR,
  UPDATE_INVITES_REQUEST,
  UPDATE_INVITES_STATE_CLEAR,
} from "../../actions/Invite/updateinvites";

const updateInvites = (state = "", action: any) => {
  switch (action.type) {
    case UPDATE_INVITES_SUCCESS:
      return Object.assign({}, action.payload);

    case UPDATE_INVITES_ERROR:
      return action.payload;

    case UPDATE_INVITES_REQUEST:
      return true;
    case UPDATE_INVITES_STATE_CLEAR:
      return "";
    default:
      return state;
  }
};
export default updateInvites;
