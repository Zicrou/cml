import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_LIFESTYLE_READING_SUCCESS = 'CREATE_LIFESTYLE_READING_SUCCESS'
export const CREATE_LIFESTYLE_READING_ERROR = 'CREATE_LIFESTYLE_READING_ERROR'
export const CREATE_LIFESTYLE_READING_REQUEST = 'CREATE_LIFESTYLE_READING_REQUEST '
interface Props {
  response: string
  sortId: string
}
export const createLifeStyleReading = (reading: Props) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', reading.response)
  data.append('answer[sortId]', reading.sortId)
  data.append('answer[recordName]', 'lifestyle-reading')

  dispatch({ type: CREATE_LIFESTYLE_READING_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/1/questions/3/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_LIFESTYLE_READING_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_LIFESTYLE_READING_ERROR,
        response: error.response
      })
    })
}
