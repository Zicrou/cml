import {
  SHOW_EVENT_MEMBERS_SUCCESS,
  SHOW_EVENT_MEMBERS_ERROR,
  SHOW_EVENT_MEMBERS_REQUEST
} from '../../actions/Event/viewMembers'

const viewEventMembers = (state = '', action: any) => {
  switch (action.type) {
    case SHOW_EVENT_MEMBERS_SUCCESS:
      return Object.assign({}, action.payload)

    case SHOW_EVENT_MEMBERS_ERROR:
      return action.payload

    case SHOW_EVENT_MEMBERS_REQUEST:
      return true

    default:
      return state
  }
}
export default viewEventMembers
