import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const SHOW_EVENT_SUCCESS = 'SHOW_EVENT_SUCCESS'
export const SHOW_EVENT_ERROR = 'SHOW_EVENT_ERROR'
export const SHOW_EVENT_REQUEST = 'SHOW_EVENT_REQUEST '

export const showEvent = (eventId: string) => (dispatch: Dispatch): void => {
  dispatch({ type: SHOW_EVENT_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      return dispatch({
        type: SHOW_EVENT_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      return dispatch({
        type: SHOW_EVENT_ERROR,
        payload: error.response
      })
    })
}
