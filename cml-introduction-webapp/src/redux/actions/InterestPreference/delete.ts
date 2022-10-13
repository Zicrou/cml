import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const DELETE_INTEREST_PREFERENCE_SUCCESS = 'DELETE_INTEREST_PREFERENCE_SUCCESS'
export const DELETE_INTEREST_PREFERENCE_ERROR = 'DELETE_INTEREST_PREFERENCE_ERROR'
export const DELETE_INTEREST_PREFERENCE_REQUEST = 'DELETE_INTEREST_PREFERENCE_REQUEST '

interface InterestPreferenceProps {
  interestedInId: string
  personId?: string | null
  eventId: string | null
}
export const deleteInterestPreference = (interest: InterestPreferenceProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('interest_preference[interested_in_id]', interest.interestedInId)

  dispatch({ type: DELETE_INTEREST_PREFERENCE_REQUEST })
  axios({
    method: 'delete',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${interest.eventId}/interest_preferences/${interest.personId}`, ///v1/events/2/interest_preferences/
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: DELETE_INTEREST_PREFERENCE_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: DELETE_INTEREST_PREFERENCE_ERROR,
        response: error.response
      })
    })
}
