import { GET_ME_SUCCESS, GET_ME_ERROR, GET_ME_REQUEST } from '../../actions/Me/getMe'
const getMe = (state = '', action: any) => {
  switch (action.type) {
    case GET_ME_SUCCESS:
      return Object.assign({}, action.payload)

    case GET_ME_ERROR:
      return 'error'

    case GET_ME_REQUEST:
      return true

    default:
      return state
  }
}
export default getMe
