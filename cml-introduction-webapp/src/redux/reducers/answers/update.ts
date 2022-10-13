import {
  UPDATE_ANSWER_SUCCESS,
  UPDATE_ANSWER_ERROR,
  UPDATE_ANSWER_REQUEST,
  RESET_UPDATE_STATE
} from '../../actions/answers/update'

const updateAnswer = (state = '', action: any) => {
  switch (action.type) {
    case UPDATE_ANSWER_SUCCESS:
      return Object.assign({}, action.payload)

    case UPDATE_ANSWER_ERROR:
      return action.payload

    case UPDATE_ANSWER_REQUEST:
      return true

    case RESET_UPDATE_STATE:
      return ''

    default:
      return state
  }
}
export default updateAnswer
