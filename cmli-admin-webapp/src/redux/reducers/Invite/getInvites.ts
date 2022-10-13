import {
  GET_INVITES_SUCCESS,
  GET_INVITES_ERROR,
  GET_INVITES_REQUEST,
} from "../../actions/Invite/getInvites";

const getInvites = (state = "", action: any) => {
  switch (action.type) {
    case GET_INVITES_SUCCESS:
      return Object.assign({}, action.payload);

    case GET_INVITES_ERROR:
      return action.payload;

    case GET_INVITES_REQUEST:
      return true;

    default:
      return state;
  }
};
export default getInvites;
