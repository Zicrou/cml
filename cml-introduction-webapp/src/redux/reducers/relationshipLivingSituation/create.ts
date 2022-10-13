import {
  CREATE_RELATIONSHIP_LIVING_SUCCESS,
  CREATE_RELATIONSHIP_LIVING_ERROR,
  CREATE_RELATIONSHIP_LIVING_REQUEST
} from '../../actions/RelationshipLivingSituation/create'

const createRelationShipLivingSituation = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_RELATIONSHIP_LIVING_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_RELATIONSHIP_LIVING_ERROR:
      return 'error'

    case CREATE_RELATIONSHIP_LIVING_REQUEST:
      return true

    default:
      return state
  }
}
export default createRelationShipLivingSituation