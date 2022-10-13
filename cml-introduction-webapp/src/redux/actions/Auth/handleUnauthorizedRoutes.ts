import readLocalStorage from '../../../utils/readLocalStorage'
import { Dispatch } from 'redux'
import axios from 'axios'
export const TOKEN_AUTH_IN_PROGRESS = 'TOKEN_AUTH_IN_PROGRESS'
export const TOKEN_AUTH_FAILED = 'TOKEN_AUTH_FAILED'
export const TOKEN_AUTH_SUCCESSFUL = 'TOKEN_AUTH_SUCCESSFUL'
export const TOKEN_AUTH_CLEAR = 'TOKEN_AUTH_CLEAR'
interface Props {
  type: string
}
type FunctionType = () => void
export const tokenAuthFailedAction = (): Props => {
  return { type: TOKEN_AUTH_FAILED }
}

export const tokenAuthSuccessfulAction = (): Props => ({
  type: TOKEN_AUTH_SUCCESSFUL
})

export const TokenAuthThunk: FunctionType = () => (dispatch: Dispatch) => {
  if (readLocalStorage('access-token') !== undefined) {
    return axios({
      method: 'get',
      url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/me`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': readLocalStorage('access-token')
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return dispatch(tokenAuthSuccessfulAction())
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return dispatch(tokenAuthFailedAction())
        }
      })
  } else {
    return dispatch(tokenAuthFailedAction())
  }
}

export const tokenAuthClear = (): Props => ({
  type: TOKEN_AUTH_CLEAR
})
