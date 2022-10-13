import {
  TOKEN_AUTH_FAILED,
  TOKEN_AUTH_SUCCESSFUL,
  TOKEN_AUTH_IN_PROGRESS,
  TOKEN_AUTH_CLEAR
} from '../../actions/Auth/handleUnauthorizedRoutes'

const auth = (state = false, action) => {
  switch (action.type) {
    case TOKEN_AUTH_IN_PROGRESS:
      return false
    case TOKEN_AUTH_FAILED:
      return 'failed'
    case TOKEN_AUTH_SUCCESSFUL:
      return true
    case TOKEN_AUTH_CLEAR:
      return ''
    default:
      return state
  }
}
export default auth
