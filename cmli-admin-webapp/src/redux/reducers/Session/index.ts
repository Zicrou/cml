import { CLEAR_SESSION, SET_SESSION } from "../../actions/Session";
const initialState = {
  isLoggedIn: false,
};
const setSession = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SESSION:
      return Object.assign({}, action.session, { isLoggedIn: true });

    case CLEAR_SESSION:
      return initialState;

    default:
      return state;
  }
};
export default setSession;
