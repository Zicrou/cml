import {
    CREATE_FINANCE_DEFINING_WEALTH_SUCCESS,
    CREATE_FINANCE_DEFINING_WEALTH_ERROR,
    CREATE_FINANCE_DEFINING_WEALTH_REQUEST
  } from '../../actions/FinanceDefiningWealth/create'

  const createFinanceDefiningWealth = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCE_DEFINING_WEALTH_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCE_DEFINING_WEALTH_ERROR:
        return 'error'

      case CREATE_FINANCE_DEFINING_WEALTH_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createFinanceDefiningWealth