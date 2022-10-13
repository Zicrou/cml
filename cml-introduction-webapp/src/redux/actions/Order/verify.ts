import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const VERIFY_ORDER_SUCCESS = 'VERIFY_ORDER_SUCCESS'
export const VERIFY_ORDER_ERROR = 'VERIFY_ORDER_ERROR'
export const VERIFY_ORDER_REQUEST = 'VERIFY_ORDER_REQUEST '

interface Params {
  orderId?: string
  eventId: string
}
export const verifyOrder = (params: Params) => (dispatch: Dispatch): void => {
  dispatch({ type: VERIFY_ORDER_REQUEST })
  axios({
    method: 'get',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${params.eventId}/verify_order?order_id=${params.orderId}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token'),
      'event-id': params.eventId
    }
  })
    .then((response) => {
      dispatch({
        type: VERIFY_ORDER_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: VERIFY_ORDER_ERROR,
        payload: error.response
      })
    })
}
