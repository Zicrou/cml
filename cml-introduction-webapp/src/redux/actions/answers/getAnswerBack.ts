import axios from 'axios'
import { AnyIfEmpty } from 'react-redux'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const GET_ANWER_BACK_SUCCESS = 'GET_ANWER_BACK_SUCCESS'
export const GET_ANWER_BACK_ERROR = 'GET_ANWER_BACK_ERROR'
export const GET_ANWER_BACK_REQUEST = 'GET_ANWER_BACK_REQUEST '

export const getAnswerBack = (record_name: any) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('record_name', record_name)
  dispatch({ type: GET_ANWER_BACK_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/backs`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_ANWER_BACK_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: GET_ANWER_BACK_ERROR,
        payload: error.response
      })
    })
}
