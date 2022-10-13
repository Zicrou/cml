import {
  CREATE_LIFESTYLE_HOBBIES_SUCCESS,
  CREATE_LIFESTYLE_HOBBIES_ERROR,
  CREATE_LIFESTYLE_HOBBIES_REQUEST,
  RESET_CREATE_LIFESTYLE
} from '../../actions/lifeStyleHobbies/create'

const createLifeStyleHobbies = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_LIFESTYLE_HOBBIES_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_LIFESTYLE_HOBBIES_ERROR:
      return 'error'

    case CREATE_LIFESTYLE_HOBBIES_REQUEST:
      return true
    case RESET_CREATE_LIFESTYLE:
      return ''
    default:
      return state
  }
}
export default createLifeStyleHobbies
