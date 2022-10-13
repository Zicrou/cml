import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCIAL_RESPONSIBILITY_SUCCESS = 'CREATE_FINANCIAL_RESPONSIBILITY_SUCCESS'
export const CREATE_FINANCIAL_RESPONSIBILITY_ERROR = 'CREATE_FINANCIAL_RESPONSIBILITY_ERROR'
export const CREATE_FINANCIAL_RESPONSIBILITY_REQUEST = 'CREATE_FINANCIAL_RESPONSIBILITY_REQUEST '
interface FinanceRes {
  response: string
  sortId: string
}
export const createFinanceDefiningResponsibility = (responsibility: FinanceRes) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', responsibility.response)
  data.append('answer[sortId]', responsibility.sortId)
  data.append('answer[recordName]', 'financial-responsibility')

  dispatch({ type: CREATE_FINANCIAL_RESPONSIBILITY_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/16/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCIAL_RESPONSIBILITY_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCIAL_RESPONSIBILITY_ERROR,
        response: error.response
      })
    })
}
