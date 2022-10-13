import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_LIVING_SUCCESS = 'CREATE_RELATIONSHIP_LIVING_SUCCESS'
export const CREATE_RELATIONSHIP_LIVING_ERROR = 'CREATE_RELATIONSHIP_LIVING_ERROR'
export const CREATE_RELATIONSHIP_LIVING_REQUEST = 'CREATE_RELATIONSHIP_LIVING_REQUEST '
interface LivingParams {
  response: string
  sortId: string
}
export const createRelationShipLivingSituation = (living: LivingParams) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', living.response)
  data.append('answer[sortId]', living.sortId)
  data.append('answer[recordName]', 'relationship-living')

  dispatch({ type: CREATE_RELATIONSHIP_LIVING_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/9/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_LIVING_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_LIVING_ERROR,
        response: error.response
      })
    })
}
