import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_QUALITY_SUCCESS = 'CREATE_RELATIONSHIP_QUALITY_SUCCESS'
export const CREATE_RELATIONSHIP_QUALITY_ERROR = 'CREATE_RELATIONSHIP_QUALITY_ERROR'
export const CREATE_RELATIONSHIP_QUALITY_REQUEST = 'CREATE_RELATIONSHIP_QUALITY_REQUEST '
interface QualityParams {
  response: string
  sortId: string
}
export const createRelationShipQuality = (quality: QualityParams) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', quality.response)
  data.append('answer[sortId]', quality.sortId)
  data.append('answer[recordName]', 'relationship-qualities')

  dispatch({ type: CREATE_RELATIONSHIP_QUALITY_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/10/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_QUALITY_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_QUALITY_ERROR,
        response: error.response
      })
    })
}
