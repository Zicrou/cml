import {
    CREATE_RELATIONSHIP_LANGUAGE_SUCCESS,
    CREATE_RELATIONSHIP_LANGUAGE_ERROR,
    CREATE_RELATIONSHIP_LANGUAGE_REQUEST
  } from '../../actions/RelationShipLanguage/create'

  const createRelationShipLanguage = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_RELATIONSHIP_LANGUAGE_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_RELATIONSHIP_LANGUAGE_ERROR:
        return 'error'

      case CREATE_RELATIONSHIP_LANGUAGE_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createRelationShipLanguage