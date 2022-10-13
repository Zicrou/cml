import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const SHOW_EVENT_MEMBERS_SUCCESS = 'SHOW_EVENT_MEMBERS_SUCCESS'
export const SHOW_EVENT_MEMBERS_ERROR = 'SHOW_EVENT_MEMBERS_ERROR'
export const SHOW_EVENT_MEMBERS_REQUEST = 'SHOW_EVENT_MEMBERS_REQUEST '

export const viewEventMembers = (eventId: string) => (dispatch: Dispatch): void => {
  dispatch({ type: SHOW_EVENT_MEMBERS_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${eventId}/event_members`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: SHOW_EVENT_MEMBERS_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: SHOW_EVENT_MEMBERS_ERROR,
        payload: error.response
      })
    })
}
