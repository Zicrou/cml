import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_CHILDREN_EXISTING_SUCCESS = 'CREATE_CHILDREN_EXISTING_SUCCESS'
export const CREATE_CHILDREN_EXISTING_ERROR = 'CREATE_CHILDREN_EXISTING_ERROR'
export const CREATE_CHILDREN_EXISTING_REQUEST = 'CREATE_CHILDREN_EXISTING_REQUEST '
interface ExistingProps {
  response: string
  sortId: string
}
export const createChildrenExisting = (existing: ExistingProps) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', existing.response)
  data.append('answer[sortId]', existing.sortId)
  data.append('answer[recordName]', 'children-existing')

  dispatch({ type: CREATE_CHILDREN_EXISTING_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/4/questions/22/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_CHILDREN_EXISTING_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_CHILDREN_EXISTING_ERROR,
        response: error.response
      })
    })
}
