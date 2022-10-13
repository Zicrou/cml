import { GET_INVITATION_SUCCESS, GET_INVITATION_ERROR, GET_INVITATION_REQUEST } from '../../actions/Invitation/get'

const getInvitation = (state = '', action: any) => {
  switch (action.type) {
    case GET_INVITATION_SUCCESS:
      return Object.assign({}, action.payload)

    case GET_INVITATION_ERROR:
      return action.payload

    case GET_INVITATION_REQUEST:
      return true

    default:
      return state
  }
}
export default getInvitation
