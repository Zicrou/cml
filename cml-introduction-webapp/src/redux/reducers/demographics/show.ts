import {
  SHOW_DEMOGRAPHICS_SUCCESS,
  SHOW_DEMOGRAPHICS_ERROR,
  SHOW_DEMOGRAPHICS_REQUEST
} from '../../actions/demographics/show'

const showDemographic = (state = '', action: any) => {
  switch (action.type) {
    case SHOW_DEMOGRAPHICS_SUCCESS:
      return Object.assign({}, action.payload)

    case SHOW_DEMOGRAPHICS_ERROR:
      return action.payload

    case SHOW_DEMOGRAPHICS_REQUEST:
      return true

    default:
      return state
  }
}
export default showDemographic
