import {
  CREATE_RELATIONSHIP_FAMILY_SUCCESS,
  CREATE_RELATIONSHIP_FAMILY_ERROR,
  CREATE_RELATIONSHIP_FAMILY_REQUEST
} from '../../actions/RelationshipFamily/create'

const createRelationShipFamily = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_RELATIONSHIP_FAMILY_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_RELATIONSHIP_FAMILY_ERROR:
      return 'error'

    case CREATE_RELATIONSHIP_FAMILY_REQUEST:
      return true

    default:
      return state
  }
}
export default createRelationShipFamily