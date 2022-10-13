import {
  UPDATE_INVITATION_SUCCESS,
  UPDATE_INVITATION_ERROR,
  UPDATE_INVITATION_REQUEST
} from '../../actions/Invitation/update'

const updateInvitation = (state = '', action: any) => {
  switch (action.type) {
    case UPDATE_INVITATION_SUCCESS:
      return Object.assign({}, action.payload)

    case UPDATE_INVITATION_ERROR:
      return action.payload

    case UPDATE_INVITATION_REQUEST:
      return true

    default:
      return state
  }
}
export default updateInvitation
