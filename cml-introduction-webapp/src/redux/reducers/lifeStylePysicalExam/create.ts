import {
    CREATE_LIFESTYLE_PHYSICAL_EXAM_SUCCESS,
    CREATE_LIFESTYLE_PHYSICAL_EXAM_ERROR,
    CREATE_LIFESTYLE_PHYSICAL_EXAM_REQUEST
  } from '../../actions/lifeStylePhysicalExam/create'

  const createLifeStyleDecision = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_LIFESTYLE_PHYSICAL_EXAM_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_LIFESTYLE_PHYSICAL_EXAM_ERROR:
        return 'error'

      case CREATE_LIFESTYLE_PHYSICAL_EXAM_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createLifeStyleDecision 