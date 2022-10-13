import {
  UPDATE_DEMOGRAPHICS_SUCCESS,
  UPDATE_DEMOGRAPHICS_ERROR,
  UPDATE_DEMOGRAPHICS_REQUEST
} from '../../actions/demographics/update'

const updateDemographics = (state = '', action: any) => {
  switch (action.type) {
    case UPDATE_DEMOGRAPHICS_SUCCESS:
      return Object.assign({}, action.payload)

    case UPDATE_DEMOGRAPHICS_ERROR:
      return action.payload

    case UPDATE_DEMOGRAPHICS_REQUEST:
      return true

    default:
      return state
  }
}
export default updateDemographics
    