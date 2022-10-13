import {
    CREATE_FINANCE_WORKING_WIFE_SUCCESS,
    CREATE_FINANCE_WORKING_WIFE_ERROR,
    CREATE_FINANCE_WORKING_WIFE_REQUEST
  } from '../../actions/FinanceWorkingWife/create'

  const createFinanceWorkingWife = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCE_WORKING_WIFE_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCE_WORKING_WIFE_ERROR:
        return 'error'

      case CREATE_FINANCE_WORKING_WIFE_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createFinanceWorkingWife