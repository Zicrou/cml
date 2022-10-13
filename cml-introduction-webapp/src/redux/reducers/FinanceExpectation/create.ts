import {
    CREATE_FINANCE_EXPECTATION_SUCCESS,
    CREATE_FINANCE_EXPECTATION_ERROR,
    CREATE_FINANCE_EXPECTATION_REQUEST
  } from '../../actions/FinanceExpectation/create'

  const createFinanceExpectation = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCE_EXPECTATION_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCE_EXPECTATION_ERROR:
        return 'error'

      case CREATE_FINANCE_EXPECTATION_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createFinanceExpectation