import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_MARRIAGE_SUCCESS = 'CREATE_RELATIONSHIP_MARRIAGE_SUCCESS'
export const CREATE_RELATIONSHIP_MARRIAGE_ERROR = 'CREATE_RELATIONSHIP_MARRIAGE_ERROR'
export const CREATE_RELATIONSHIP_MARRIAGE_REQUEST = 'CREATE_RELATIONSHIP_MARRIAGE_REQUEST '
interface MarriageParams {
  response: string
  sortId: string
}
export const createRelationShipMarriage = (marriage: MarriageParams) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', marriage.response)
  data.append('answer[sortId]', marriage.sortId)
  data.append('answer[recordName]', 'relationship-marriage')

  dispatch({ type: CREATE_RELATIONSHIP_MARRIAGE_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/14/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_MARRIAGE_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_MARRIAGE_ERROR,
        response: error.response
      })
    })
}
