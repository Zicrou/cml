import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_LIFESTYLE_HOBBIES_SUCCESS = 'CREATE_LIFESTYLE_HOBBIES_SUCCESS'
export const CREATE_LIFESTYLE_HOBBIES_ERROR = 'CREATE_LIFESTYLE_HOBBIES_ERROR'
export const CREATE_LIFESTYLE_HOBBIES_REQUEST = 'CREATE_LIFESTYLE_HOBBIES_REQUEST '
export const RESET_CREATE_LIFESTYLE = 'RESET_CREATE_LIFESTYLE'
interface Props {
  response: string
  sortId: string
}
export const createLifeStyleHobbies = (hobby: Props) => (dispatch: Dispatch): void => {
  const data = new FormData()
  data.append('answer[answerType]', 'string')
  data.append('answer[response]', hobby.response)
  data.append('answer[sortId]', hobby.sortId)
  data.append('answer[recordName]', 'lifestyle-hobbies')

  dispatch({ type: CREATE_LIFESTYLE_HOBBIES_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/1/questions/1/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_LIFESTYLE_HOBBIES_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_LIFESTYLE_HOBBIES_ERROR,
        payload: error.response
      })
    })
}

export const resetLifeStyleHobbies = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_CREATE_LIFESTYLE
  })
}
