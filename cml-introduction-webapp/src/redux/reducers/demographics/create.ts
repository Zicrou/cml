import {
  CREATE_DEMOGRAPHICS_SUCCESS,
  CREATE_DEMOGRAPHICS_ERROR,
  CREATE_DEMOGRAPHICS_REQUEST
} from '../../actions/demographics/create'

const createDemographics = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_DEMOGRAPHICS_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_DEMOGRAPHICS_ERROR:
      return action.payload

    case CREATE_DEMOGRAPHICS_REQUEST:
      return true

    default:
      return state
  }
}
export default createDemographics
