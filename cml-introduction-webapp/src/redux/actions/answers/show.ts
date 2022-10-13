import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const GET_ANSWER_SUCCESS = 'GET_ANSWER_SUCCESS'
export const GET_ANSWER_ERROR = 'GET_ANSWER_ERROR'
export const GET_ANSWER_REQUEST = 'GET_ANSWER_REQUEST '

export const getAnswer = (answerId: string) => (dispatch: Dispatch): void => {
  dispatch({ type: GET_ANSWER_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/me/answers/${answerId}`,
    headers: {
      Accept: 'application/json',

      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_ANSWER_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: GET_ANSWER_ERROR,
        payload: error.response
      })
    })
}
