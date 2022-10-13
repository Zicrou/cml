import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const GET_INVITATION_SUCCESS = 'GET_INVITATION_SUCCESS'
export const GET_INVITATION_ERROR = 'GET_INVITATION_ERROR'
export const GET_INVITATION_REQUEST = 'GET_INVITATION_REQUEST '

interface InvitationGetProps {
  status: string
  eventId: string
  invitationId: string
}
export const getInvitation = (invitation: InvitationGetProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  dispatch({ type: GET_INVITATION_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${invitation}/invitations/me`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: GET_INVITATION_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: GET_INVITATION_ERROR,
        payload: error.response
      })
    })
}
