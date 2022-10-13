import {
    CREATE_RELATIONSHIP_EXPECTATION_SUCCESS,
    CREATE_RELATIONSHIP_EXPECTATION_ERROR,
    CREATE_RELATIONSHIP_EXPECTATION_REQUEST
  } from '../../actions/RelationShipExpectation/create'

  const createRelationShipExpectation = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_RELATIONSHIP_EXPECTATION_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_RELATIONSHIP_EXPECTATION_ERROR:
        return 'error'

      case CREATE_RELATIONSHIP_EXPECTATION_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createRelationShipExpectation