import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_LANGUAGE_SUCCESS = 'CREATE_RELATIONSHIP_LANGUAGE_SUCCESS'
export const CREATE_RELATIONSHIP_LANGUAGE_ERROR = 'CREATE_RELATIONSHIP_LANGUAGE_ERROR'
export const CREATE_RELATIONSHIP_LANGUAGE_REQUEST = 'CREATE_RELATIONSHIP_LANGUAGE_REQUEST '

interface LanguageParams {
  response: string
  sortId: string
}
export const createRelationShipLanguage = (language: LanguageParams) => (dispatch: Dispatch): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', language.response)
  data.append('answer[sortId]', language.sortId)
  data.append('answer[recordName]', 'relationship-language')

  dispatch({ type: CREATE_RELATIONSHIP_LANGUAGE_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/13/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_LANGUAGE_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_LANGUAGE_ERROR,
        response: error.response
      })
    })
}
