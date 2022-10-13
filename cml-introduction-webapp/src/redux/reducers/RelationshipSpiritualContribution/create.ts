import {
    CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_SUCCESS,
    CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_ERROR,
    CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_REQUEST
  } from '../../actions/RelationshipSpiritualContribution/create'

  const createRelationShipSpiritualContribution = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_ERROR:
        return 'error'

      case CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createRelationShipSpiritualContribution