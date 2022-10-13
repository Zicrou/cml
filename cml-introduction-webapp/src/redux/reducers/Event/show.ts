import { SHOW_EVENT_SUCCESS, SHOW_EVENT_ERROR, SHOW_EVENT_REQUEST } from '../../actions/Event/show'

const showEvent = (state = '', action: any) => {
  switch (action.type) {
    case SHOW_EVENT_SUCCESS:
      return Object.assign({}, action.payload)

    case SHOW_EVENT_ERROR:
      return action.payload

    case SHOW_EVENT_REQUEST:
      return true

    default:
      return state
  }
}
export default showEvent
