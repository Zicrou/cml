import {
  CREATE_CHILDREN_EXISTING_SUCCESS,
  CREATE_CHILDREN_EXISTING_ERROR,
  CREATE_CHILDREN_EXISTING_REQUEST
} from '../../actions/childrenExisting/create'

const createChildrenExisting = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_CHILDREN_EXISTING_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_CHILDREN_EXISTING_ERROR:
      return 'error'

    case CREATE_CHILDREN_EXISTING_REQUEST:
      return true

    default:
      return state
  }
}
export default createChildrenExisting