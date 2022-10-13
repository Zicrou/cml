import {
    CREATE_FINANCIAL_DEPENDENT_SUCCESS,
    CREATE_FINANCIAL_DEPENDENT_ERROR,
    CREATE_FINANCIAL_DEPENDENT_REQUEST
  } from '../../actions/FinancialDependent/create'

  const createFinancialDependent = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCIAL_DEPENDENT_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCIAL_DEPENDENT_ERROR:
        return 'error'

      case CREATE_FINANCIAL_DEPENDENT_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createFinancialDependent