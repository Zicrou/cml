import { VERIFY_ORDER_SUCCESS, VERIFY_ORDER_ERROR, VERIFY_ORDER_REQUEST } from '../../actions/Order/verify'

const verifyOrder = (state = '', action: any) => {
  switch (action.type) {
    case VERIFY_ORDER_SUCCESS:
      return Object.assign({}, action.payload)

    case VERIFY_ORDER_ERROR:
      return action.payload

    case VERIFY_ORDER_REQUEST:
      return true

    default:
      return state
  }
}
export default verifyOrder
