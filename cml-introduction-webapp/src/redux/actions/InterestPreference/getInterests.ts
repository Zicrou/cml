import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const GET_INTEREST_PREFERENCES_SUCCESS = 'GET_INTEREST_PREFERENCES_SUCCESS'
export const GET_INTEREST_PREFERENCES_ERROR = 'GET_INTEREST_PREFERENCES_ERROR'
export const GET_INTEREST_PREFERENCES_REQUEST = 'GET_INTEREST_PREFERENCES_REQUEST '
export const GET_INTEREST_PREFERENCES_RESET = 'GET_INTEREST_PREFERENCES_RESET '
interface InterestPreferenceProps {
  eventId: string | null
}
export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: GET_INTEREST_PREFERENCES_RESET })
}

export const getInterestPreferences = (interest: InterestPreferenceProps) => (dispatch: Dispatch): void => {
  dispatch({ type: GET_INTEREST_PREFERENCES_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${interest.eventId}/interest_preferences`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_INTEREST_PREFERENCES_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: GET_INTEREST_PREFERENCES_ERROR,
        response: error.response
      })
    })
}
