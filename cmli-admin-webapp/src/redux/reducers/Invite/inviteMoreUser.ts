import {
  GET_INVITE_MORE_USER_SUCCESS,
  GET_INVITE_MORE_USER_ERROR,
  GET_INVITE_MORE_USER_REQUEST,
} from "../../actions/Invite/inviteMoreUser";

const inviteMoreUser = (state = "", action: any) => {
  switch (action.type) {
    case GET_INVITE_MORE_USER_SUCCESS:
      return Object.assign({}, action.payload);

    case GET_INVITE_MORE_USER_ERROR:
      return action.payload;

    case GET_INVITE_MORE_USER_REQUEST:
      return true;

    default:
      return state;
  }
};
export default inviteMoreUser;
