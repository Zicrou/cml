import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCE_DEFINING_WEALTH_SUCCESS = 'CREATE_FINANCE_DEFINING_WEALTH_SUCCESS'
export const CREATE_FINANCE_DEFINING_WEALTH_ERROR = 'CREATE_FINANCE_DEFINING_WEALTH_ERROR'
export const CREATE_FINANCE_DEFINING_WEALTH_REQUEST = 'CREATE_FINANCE_DEFINING_WEALTH_REQUEST '
interface FinanceWealth {
  response: string
  sortId: string
}
export const createFinanceDefiningWealth = (wealth: FinanceWealth) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', wealth.response)
  data.append('answer[sortId]', wealth.sortId)
  data.append('answer[recordName]', 'finance-defining-wealth')

  dispatch({ type: CREATE_FINANCE_DEFINING_WEALTH_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/15/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCE_DEFINING_WEALTH_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCE_DEFINING_WEALTH_ERROR,
        response: error.response
      })
    })
}
