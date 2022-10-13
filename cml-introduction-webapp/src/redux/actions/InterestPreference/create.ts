import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_INTEREST_PREFERENCE_SUCCESS = 'CREATE_INTEREST_PREFERENCE_SUCCESS'
export const CREATE_INTEREST_PREFERENCE_ERROR = 'CREATE_INTEREST_PREFERENCE_ERROR'
export const CREATE_INTEREST_PREFERENCE_REQUEST = 'CREATE_INTEREST_PREFERENCE_REQUEST '

interface InterestPreferenceProps {
  interestedInId: string
  eventId: string | null
}
export const createInterestPreference = (interest: InterestPreferenceProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('interest_preference[interested_in_id]', interest.interestedInId)

  dispatch({ type: CREATE_INTEREST_PREFERENCE_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${interest.eventId}/interest_preferences`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_INTEREST_PREFERENCE_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_INTEREST_PREFERENCE_ERROR,
        response: error.response
      })
    })
}
