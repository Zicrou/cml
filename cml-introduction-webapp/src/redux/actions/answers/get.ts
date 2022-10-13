import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const GET_ANSWERS_SUCCESS = 'GET_ANSWERS_SUCCESS'
export const GET_ANSWERS_ERROR = 'GET_ANSWERS_ERROR'
export const GET_ANSWERS_REQUEST = 'GET_ANSWERS_REQUEST '
type FunctionType = () => void
export const getAnswers: FunctionType = () => (dispatch: Dispatch): void => {
  dispatch({ type: GET_ANSWERS_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/me/answers`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_ANSWERS_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: GET_ANSWERS_ERROR,
        payload: error.response
      })
    })
}
