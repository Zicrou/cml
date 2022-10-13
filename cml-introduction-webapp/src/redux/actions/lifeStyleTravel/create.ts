import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_LIFESTYLE_TRAVEL_SUCCESS = 'CREATE_LIFESTYLE_TRAVEL_SUCCESS'
export const CREATE_LIFESTYLE_TRAVEL_ERROR = 'CREATE_LIFESTYLE_TRAVEL_ERROR'
export const CREATE_LIFESTYLE_TRAVEL_REQUEST = 'CREATE_LIFESTYLE_TRAVEL_REQUEST '
interface Props {
  response: string
  sortId: string
}
export const createLifeStyleTravel = (travel: Props) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', travel.response)
  data.append('answer[sortId]', travel.sortId)
  data.append('answer[recordName]', 'lifestyle-travel')

  dispatch({ type: CREATE_LIFESTYLE_TRAVEL_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/1/questions/2/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_LIFESTYLE_TRAVEL_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_LIFESTYLE_TRAVEL_ERROR,
        response: error.response
      })
    })
}
