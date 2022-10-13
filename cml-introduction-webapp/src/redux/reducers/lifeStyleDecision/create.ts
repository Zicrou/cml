import {
    CREATE_LIFESTYLE_DECISION_SUCCESS,
    CREATE_LIFESTYLE_DECISION_ERROR,
    CREATE_LIFESTYLE_DECISION_REQUEST
  } from '../../actions/lifeStyleDecision/create'

  const createLifeStyleDecision = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_LIFESTYLE_DECISION_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_LIFESTYLE_DECISION_ERROR:
        return 'error'

      case CREATE_LIFESTYLE_DECISION_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createLifeStyleDecision 