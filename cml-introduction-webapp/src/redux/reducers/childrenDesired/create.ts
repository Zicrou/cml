import {
  CREATE_CHILDREN_DESIRED_SUCCESS,
  CREATE_CHILDREN_DESIRED_ERROR,
  CREATE_CHILDREN_DESIRED_REQUEST
} from '../../actions/childrenDesired/create'

const createChildrenDesired = (state = '', action: any) => {
  switch (action.type) {
    case CREATE_CHILDREN_DESIRED_SUCCESS:
      return Object.assign({}, action.payload)

    case CREATE_CHILDREN_DESIRED_ERROR:
      return 'error'

    case CREATE_CHILDREN_DESIRED_REQUEST:
      return true

    default:
      return state
  }
}
export default createChildrenDesired