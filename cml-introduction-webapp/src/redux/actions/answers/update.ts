import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'
export const UPDATE_ANSWER_SUCCESS = 'UPDATE_ANSWER_SUCCESS'
export const UPDATE_ANSWER_ERROR = 'UPDATE_ANSWER_ERROR'
export const UPDATE_ANSWER_REQUEST = 'UPDATE_ANSWER_REQUEST'
export const RESET_UPDATE_STATE = 'RESET_UPDATE_STATE'
interface answerProps {
  id: string
  type?: string
  response: string
  sortId: string
}
export const updateAnswer = (answer: answerProps) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', answer.response)
  data.append('answer[sortId]', answer.sortId)

  dispatch({ type: UPDATE_ANSWER_REQUEST })
  axios({
    method: 'put',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/me/answers/${answer.id}`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      return dispatch({
        type: UPDATE_ANSWER_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      return dispatch({
        type: UPDATE_ANSWER_ERROR,
        payload: error.response
      })
    })
}

export const resetUpdateState = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_UPDATE_STATE
  })
}
