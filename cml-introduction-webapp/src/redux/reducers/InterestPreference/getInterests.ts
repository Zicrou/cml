import {
  GET_INTEREST_PREFERENCES_SUCCESS,
  GET_INTEREST_PREFERENCES_ERROR,
  GET_INTEREST_PREFERENCES_REQUEST,
  GET_INTEREST_PREFERENCES_RESET
} from '../../actions/InterestPreference/getInterests'

const getInterestPreferences = (state = '', action: any) => {
  switch (action.type) {
    case GET_INTEREST_PREFERENCES_SUCCESS:
      return Object.assign({}, action.payload)

    case GET_INTEREST_PREFERENCES_ERROR:
      return 'error'

    case GET_INTEREST_PREFERENCES_REQUEST:
      return true

    case GET_INTEREST_PREFERENCES_RESET:
      return ''

    default:
      return state
  }
}
export default getInterestPreferences
