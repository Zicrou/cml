import {
    CREATE_LIFESTYLE_TRAVEL_SUCCESS,
    CREATE_LIFESTYLE_TRAVEL_ERROR,
    CREATE_LIFESTYLE_TRAVEL_REQUEST
  } from '../../actions/lifeStyleTravel/create'
  
  const createLifeStyleTravel = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_LIFESTYLE_TRAVEL_SUCCESS:
        return Object.assign({}, action.payload)
  
      case CREATE_LIFESTYLE_TRAVEL_ERROR:
        return 'error'
  
      case CREATE_LIFESTYLE_TRAVEL_REQUEST:
        return true
  
      default:
        return state
    }
  }
  export default createLifeStyleTravel
  