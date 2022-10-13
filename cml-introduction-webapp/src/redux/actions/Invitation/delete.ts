import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const DELETE_INVITATION_SUCCESS = 'DELETE_INVITATION_SUCCESS'
export const DELETE_INVITATION_ERROR = 'DELETE_INVITATION_ERROR'
export const DELETE_INVITATION_REQUEST = 'DELETE_INVITATION_REQUEST '

interface InvitationDeleteProps {
  status: string
  eventId: string
  invitationId: string
}
export const deleteInvitation = (invitation: InvitationDeleteProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  dispatch({ type: DELETE_INVITATION_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${invitation}/invitations/delete`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: DELETE_INVITATION_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: DELETE_INVITATION_ERROR,
        payload: error.response
      })
    })
}
