import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCE_DEBT_SUCCESS = 'CREATE_FINANCE_DEBT_SUCCESS'
export const CREATE_FINANCE_DEBT_ERROR = 'CREATE_FINANCE_DEBT_ERROR'
export const CREATE_FINANCE_DEBT_REQUEST = 'CREATE_FINANCE_DEBT_REQUEST '

interface DebtProps {
  response: string
  sortId: string
}
export const createFinanceDebt = (debt: DebtProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', debt.response)
  data.append('answer[sortId]', debt.sortId)
  data.append('answer[recordName]', 'financial-debt')

  dispatch({ type: CREATE_FINANCE_DEBT_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/19/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCE_DEBT_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCE_DEBT_ERROR,
        response: error.response
      })
    })
}
