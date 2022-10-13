import {
  DELETE_INVITATION_SUCCESS,
  DELETE_INVITATION_ERROR,
  DELETE_INVITATION_REQUEST
} from '../../actions/Invitation/delete'

const deleteInvitation = (state = '', action: any) => {
  switch (action.type) {
    case DELETE_INVITATION_SUCCESS:
      return Object.assign({}, action.payload)

    case DELETE_INVITATION_ERROR:
      return action.payload

    case DELETE_INVITATION_REQUEST:
      return true

    default:
      return state
  }
}
export default deleteInvitation
