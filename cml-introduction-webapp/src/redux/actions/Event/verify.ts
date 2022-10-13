import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const VERIFY_EVENT_SUCCESS = 'VERIFY_EVENT_SUCCESS'
export const VERIFY_EVENT_ERROR = 'VERIFY_EVENT_ERROR'
export const VERIFY_EVENT_REQUEST = 'VERIFY_EVENT_REQUEST'
export const VERIFY_EVENT_RESET = 'VERIFY_EVENT_REQUEST '

export const verifyEvent = (eventCode: string) => (dispatch: Dispatch): void => {
  dispatch({ type: VERIFY_EVENT_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events?event_code=${eventCode}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: VERIFY_EVENT_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: VERIFY_EVENT_ERROR,
        payload: error.response
      })
    })
}
export const resetEvent = () => ({
  type: VERIFY_EVENT_RESET
})
