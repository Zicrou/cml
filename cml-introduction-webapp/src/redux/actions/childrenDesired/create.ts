import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_CHILDREN_DESIRED_SUCCESS = 'CREATE_CHILDREN_DESIRED_SUCCESS'
export const CREATE_CHILDREN_DESIRED_ERROR = 'CREATE_CHILDREN_DESIRED_ERROR'
export const CREATE_CHILDREN_DESIRED_REQUEST = 'CREATE_CHILDREN_DESIRED_REQUEST '
interface DesiredProps {
  response: string
  sortId: string
}
export const createChildrenDesired = (desired: DesiredProps) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', desired.response)
  data.append('answer[sortId]', desired.sortId)
  data.append('answer[recordName]', 'children-desired')

  dispatch({ type: CREATE_CHILDREN_DESIRED_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/4/questions/21/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_CHILDREN_DESIRED_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_CHILDREN_DESIRED_ERROR,
        response: error.response
      })
    })
}
