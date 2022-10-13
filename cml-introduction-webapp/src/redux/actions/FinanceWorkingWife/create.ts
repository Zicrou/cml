import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCE_WORKING_WIFE_SUCCESS = 'CREATE_FINANCE_WORKING_WIFE_SUCCESS'
export const CREATE_FINANCE_WORKING_WIFE_ERROR = 'CREATE_FINANCE_WORKING_WIFE_ERROR'
export const CREATE_FINANCE_WORKING_WIFE_REQUEST = 'CREATE_FINANCE_WORKING_WIFE_REQUEST '
interface FinanceWorkingWife {
  response: string
  sortId: string
}
export const createFinanceWorkingWife = (wife: FinanceWorkingWife) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', wife.response)
  data.append('answer[sortId]', wife.sortId)
  data.append('answer[recordName]', 'finance-working-wife')

  dispatch({ type: CREATE_FINANCE_WORKING_WIFE_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/18/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCE_WORKING_WIFE_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCE_WORKING_WIFE_ERROR,
        response: error.response
      })
    })
}
