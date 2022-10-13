import axios from 'axios'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const SHOW_DEMOGRAPHICS_SUCCESS = 'SHOW_DEMOGRAPHICS_SUCCESS'
export const SHOW_DEMOGRAPHICS_ERROR = 'SHOW_DEMOGRAPHICS_ERROR'
export const SHOW_DEMOGRAPHICS_REQUEST = 'SHOW_DEMOGRAPHICS_REQUEST '

export const showDemographic = (userId?: string) => (dispatch: any) => {
  dispatch({ type: SHOW_DEMOGRAPHICS_REQUEST })
  return axios({
    method: 'get',
    url: userId
      ? `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/${userId}/demographic`
      : `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/me/demographic`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: SHOW_DEMOGRAPHICS_SUCCESS,
        payload: response
      })
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      return dispatch({
        type: SHOW_DEMOGRAPHICS_ERROR,
        payload: error.response
      })
    })
}
