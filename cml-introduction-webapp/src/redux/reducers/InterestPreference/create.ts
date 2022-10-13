import {
    CREATE_INTEREST_PREFERENCE_SUCCESS,
    CREATE_INTEREST_PREFERENCE_ERROR,
    CREATE_INTEREST_PREFERENCE_REQUEST
  } from '../../actions/InterestPreference/create'

  const createInterestPreference = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_INTEREST_PREFERENCE_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_INTEREST_PREFERENCE_ERROR:
        return 'error'

      case CREATE_INTEREST_PREFERENCE_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createInterestPreference