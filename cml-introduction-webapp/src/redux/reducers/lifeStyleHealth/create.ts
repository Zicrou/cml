import {
    CREATE_LIFESTYLE_HEALTH_SUCCESS,
    CREATE_LIFESTYLE_HEALTH_ERROR,
    CREATE_LIFESTYLE_HEALTH_REQUEST
  } from '../../actions/lifeStyleHealth/create'
  
  const createLifeStyleHealth = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_LIFESTYLE_HEALTH_SUCCESS:
        return Object.assign({}, action.payload)
  
      case CREATE_LIFESTYLE_HEALTH_ERROR:
        return 'error'
  
      case CREATE_LIFESTYLE_HEALTH_REQUEST:
        return true
  
      default:
        return state
    }
  }
  export default createLifeStyleHealth