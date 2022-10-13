import axios from 'axios'
import { Dispatch } from 'redux'
import readLocalStorage from '../../../utils/readLocalStorage'
import { tokenAuthFailedAction } from '../Auth/handleUnauthorizedRoutes'

export const CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_SUCCESS = 'CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_SUCCESS'
export const CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_ERROR = 'CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_ERROR'
export const CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_REQUEST = 'CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_REQUEST '
interface ContributionParams {
  response: string
  sortId: string
}
export const createRelationShipSpiritualContribution = (contribution: ContributionParams) => (
  dispatch: Dispatch
): void => {
  const data = new FormData()

  data.append('answer[answerType]', 'string')
  data.append('answer[response]', contribution.response)
  data.append('answer[sortId]', contribution.sortId)
  data.append('answer[recordName]', 'relationship-spiritual-contribution')

  dispatch({ type: CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_REQUEST })
  axios({
    method: 'post',
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/question_categories/2/questions/12/answers`,
    data: data,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': readLocalStorage('access-token')
    }
  })
    .then((response) => {
      dispatch({
        type: CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_SUCCESS,
        payload: response
      })
    })
    .catch((error) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction())
      }
      dispatch({
        type: CREATE_RELATIONSHIP_SPIRITUAL_CONTRIBUTION_ERROR,
        response: error.response
      })
    })
}
