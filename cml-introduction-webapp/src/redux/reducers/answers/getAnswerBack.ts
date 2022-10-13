import {
  GET_ANWER_BACK_SUCCESS,
  GET_ANWER_BACK_ERROR,
  GET_ANWER_BACK_REQUEST
} from '../../actions/answers/getAnswerBack'

const getAnswerBack = (state = '', action: any) => {
  switch (action.type) {
    case GET_ANWER_BACK_SUCCESS:
      return Object.assign({}, action.payload)

    case GET_ANWER_BACK_ERROR:
      return action.payload

    case GET_ANWER_BACK_REQUEST:
      return true

    default:
      return state
  }
}
export default getAnswerBack
