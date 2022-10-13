import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const UPDATE_INVITATION_SUCCESS = 'UPDATE_INVITATION_SUCCESS'
export const UPDATE_INVITATION_ERROR = 'UPDATE_INVITATION_ERROR'
export const UPDATE_INVITATION_REQUEST = 'UPDATE_INVITATION_REQUEST '
interface InvitationUpdateProps {
  status: string
  eventId: string
  invitationId: string
}
export const updateInvitation = (invitation: InvitationUpdateProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('invitation[status]', invitation.status)
  dispatch({ type: UPDATE_INVITATION_REQUEST })
  axios({
    method: 'put',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${invitation.eventId}/invitations/${invitation.invitationId}`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: UPDATE_INVITATION_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: UPDATE_INVITATION_ERROR,
        payload: error.response
      })
    })
}
