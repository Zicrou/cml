import {
    CREATE_RELATIONSHIP_QUALITY_SUCCESS,
    CREATE_RELATIONSHIP_QUALITY_ERROR,
    CREATE_RELATIONSHIP_QUALITY_REQUEST
  } from '../../actions/RelationShipQuality/create'

  const createRelationShipQuality = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_RELATIONSHIP_QUALITY_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_RELATIONSHIP_QUALITY_ERROR:
        return 'error'

      case CREATE_RELATIONSHIP_QUALITY_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createRelationShipQuality