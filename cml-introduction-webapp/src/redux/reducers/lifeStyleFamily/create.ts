import {
  CREATE_LIFESTYLE_FAMILY_SUCCESS,
  CREATE_LIFESTYLE_FAMILY_ERROR,
  CREATE_LIFESTYLE_FAMILY_REQUEST
} from '../../actions/lifeStyleFamily/create'

const createLifeStyleFamily = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_LIFESTYLE_FAMILY_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_LIFESTYLE_FAMILY_ERROR:
      return 'error'

    case CREATE_LIFESTYLE_FAMILY_REQUEST:
      return true

    default:
      return state
  }
}
export default createLifeStyleFamily
