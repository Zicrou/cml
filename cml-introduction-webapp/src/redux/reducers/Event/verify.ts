import {
  VERIFY_EVENT_SUCCESS,
  VERIFY_EVENT_ERROR,
  VERIFY_EVENT_REQUEST,
  VERIFY_EVENT_RESET
} from '../../actions/Event/verify'

const verifyEvent = (state = '', action: any) => {
  switch (action.type) {
    case VERIFY_EVENT_SUCCESS:
      return Object.assign({}, action.payload)

    case VERIFY_EVENT_ERROR:
      return action.payload

    case VERIFY_EVENT_REQUEST:
      return true

    case VERIFY_EVENT_RESET:
      return ''

    default:
      return state
  }
}
export default verifyEvent
