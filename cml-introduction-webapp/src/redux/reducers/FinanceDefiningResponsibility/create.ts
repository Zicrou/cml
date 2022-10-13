import {
    CREATE_FINANCIAL_RESPONSIBILITY_SUCCESS,
    CREATE_FINANCIAL_RESPONSIBILITY_ERROR,
    CREATE_FINANCIAL_RESPONSIBILITY_REQUEST
  } from '../../actions/FinanceDefiningResponsibility/create'

  const createcreateFinanceDefiningResponsibility = (state = '', action: any) => {
    switch (action.type) {
      case CREATE_FINANCIAL_RESPONSIBILITY_SUCCESS:
        return Object.assign({}, action.payload)

      case CREATE_FINANCIAL_RESPONSIBILITY_ERROR:
        return 'error'

      case CREATE_FINANCIAL_RESPONSIBILITY_REQUEST:
        return true

      default:
        return state
    }
  }
  export default createcreateFinanceDefiningResponsibility