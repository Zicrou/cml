import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_FAMILY_SUCCESS = 'CREATE_RELATIONSHIP_FAMILY_SUCCESS'
export const CREATE_RELATIONSHIP_FAMILY_ERROR = 'CREATE_RELATIONSHIP_FAMILY_ERROR'
export const CREATE_RELATIONSHIP_FAMILY_REQUEST = 'CREATE_RELATIONSHIP_FAMILY_REQUEST '
interface FamilyParams {
  response: string
  sortId: string
}
export const createRelationShipFamily = (family: FamilyParams) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', family.response)
  data.append('answer[sortId]', family.sortId)
  data.append('answer[recordName]', 'relationship-family')

  dispatch({ type: CREATE_RELATIONSHIP_FAMILY_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/8/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_FAMILY_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_FAMILY_ERROR,
        response: error.response
      })
    })
}
