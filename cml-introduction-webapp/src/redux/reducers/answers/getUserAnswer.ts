import {
  GET_USER_ANSWERS_SUCCESS,
  GET_USER_ANSWERS_ERROR,
  GET_USER_ANSWERS_REQUEST
} from '../../actions/answers/getUserAnswer'

const getUserAnswer = (state = '', action: any) => {
  switch (action.type) {
    case GET_USER_ANSWERS_SUCCESS:
      return Object.assign({}, action.payload)

    case GET_USER_ANSWERS_ERROR:
      return action.payload

    case GET_USER_ANSWERS_REQUEST:
      return true

    default:
      return state
  }
}
export default getUserAnswer
