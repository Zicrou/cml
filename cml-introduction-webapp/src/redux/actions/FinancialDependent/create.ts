import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCIAL_DEPENDENT_SUCCESS = 'CREATE_FINANCIAL_DEPENDENT_SUCCESS'
export const CREATE_FINANCIAL_DEPENDENT_ERROR = 'CREATE_FINANCIAL_DEPENDENT_ERROR'
export const CREATE_FINANCIAL_DEPENDENT_REQUEST = 'CREATE_FINANCIAL_DEPENDENT_REQUEST '
interface FinancialDependent {
  response: string
  sortId: string
}
export const createFinancialDependent = (dependent: FinancialDependent) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', dependent.response)
  data.append('answer[sortId]', dependent.sortId)
  data.append('answer[recordName]', 'financial-dependents')

  dispatch({ type: CREATE_FINANCIAL_DEPENDENT_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/20/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCIAL_DEPENDENT_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCIAL_DEPENDENT_ERROR,
        response: error.response
      })
    })
}
