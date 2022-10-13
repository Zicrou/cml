import {
  DELETE_INTEREST_PREFERENCE_SUCCESS,
  DELETE_INTEREST_PREFERENCE_ERROR,
  DELETE_INTEREST_PREFERENCE_REQUEST
} from '../../actions/InterestPreference/delete'

const deleteInterestPreference = (state = '', action: any) => {
  switch (action.type) {
    case DELETE_INTEREST_PREFERENCE_SUCCESS:
      return Object.assign({}, action.payload)

    case DELETE_INTEREST_PREFERENCE_ERROR:
      return 'error'

    case DELETE_INTEREST_PREFERENCE_REQUEST:
      return true

    default:
      return state
  }
}
export default deleteInterestPreference
