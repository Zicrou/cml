import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
export const GET_ME_SUCCESS = 'GET_ME_SUCCESS'
export const GET_ME_ERROR = 'GET_ME_ERROR'
export const GET_ME_REQUEST = 'GET_ME_REQUEST '

export const getMe = () => (dispatch: Dispatch): void => {
  dispatch({ type: GET_ME_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/me`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_ME_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      dispatch({
        type: GET_ME_ERROR,
        payload: error.response
      })
    })
}
