import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_FINANCE_EXPECTATION_SUCCESS = 'CREATE_FINANCE_EXPECTATION_SUCCESS'
export const CREATE_FINANCE_EXPECTATION_ERROR = 'CREATE_FINANCE_EXPECTATION_ERROR'
export const CREATE_FINANCE_EXPECTATION_REQUEST = 'CREATE_FINANCE_EXPECTATION_REQUEST '
interface FinanceExpect {
  response: string
  sortId: string
}
export const createFinanceExpectation = (expectation: FinanceExpect) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', expectation.response)
  data.append('answer[sortId]', expectation.sortId)
  data.append('answer[recordName]', 'financial-expectation')

  dispatch({ type: CREATE_FINANCE_EXPECTATION_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/3/questions/17/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_FINANCE_EXPECTATION_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_FINANCE_EXPECTATION_ERROR,
        response: error.response
      })
    })
}
