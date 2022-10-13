import {
    CREATE_FINANCE_DEBT_SUCCESS,
    CREATE_FINANCE_DEBT_ERROR,
    CREATE_FINANCE_DEBT_REQUEST
  } from '../../actions/FinanceDebt/create'

  const createFinanceDebt = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCE_DEBT_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCE_DEBT_ERROR:
        return 'error'

      case CREATE_FINANCE_DEBT_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createFinanceDebt