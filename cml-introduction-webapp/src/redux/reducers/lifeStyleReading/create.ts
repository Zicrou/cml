import {
    CREATE_LIFESTYLE_READING_SUCCESS,
    CREATE_LIFESTYLE_READING_ERROR,
    CREATE_LIFESTYLE_READING_REQUEST
  } from '../../actions/lifeStyleReading/create'
  
  const createLifeStyleReading = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_LIFESTYLE_READING_SUCCESS:
        return Object.assign({}, action.payload)
  
      case CREATE_LIFESTYLE_READING_ERROR:
        return 'error'
  
      case CREATE_LIFESTYLE_READING_REQUEST:
        return true
  
      default:
        return state
    }
  }
  export default createLifeStyleReading