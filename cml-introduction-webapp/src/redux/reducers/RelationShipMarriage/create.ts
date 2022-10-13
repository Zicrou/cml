import {
    CREATE_RELATIONSHIP_MARRIAGE_SUCCESS,
    CREATE_RELATIONSHIP_MARRIAGE_ERROR,
    CREATE_RELATIONSHIP_MARRIAGE_REQUEST
  } from '../../actions/RelationShipMarriage/create'

  const createRelationShipMarriage = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_RELATIONSHIP_MARRIAGE_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_RELATIONSHIP_MARRIAGE_ERROR:
        return 'error'

      case CREATE_RELATIONSHIP_MARRIAGE_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createRelationShipMarriage