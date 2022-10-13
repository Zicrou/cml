import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_LIFESTYLE_PHYSICAL_EXAM_SUCCESS = 'CREATE_LIFESTYLE_PHYSICAL_EXAM_SUCCESS'
export const CREATE_LIFESTYLE_PHYSICAL_EXAM_ERROR = 'CREATE_LIFESTYLE_PHYSICAL_EXAM_ERROR'
export const CREATE_LIFESTYLE_PHYSICAL_EXAM_REQUEST = 'CREATE_LIFESTYLE_PHYSICAL_EXAM_REQUEST '
interface Props {
  response: string
  sortId: string
}
export const createLifeStylePhysicalExam = (decision: Props) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', decision.response)
  data.append('answer[sortId]', decision.sortId)
  data.append('answer[recordName]', 'lifestyle-physical-exam')

  dispatch({ type: CREATE_LIFESTYLE_PHYSICAL_EXAM_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/1/questions/6/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_LIFESTYLE_PHYSICAL_EXAM_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_LIFESTYLE_PHYSICAL_EXAM_ERROR,
        response: error.response
      })
    })
}
