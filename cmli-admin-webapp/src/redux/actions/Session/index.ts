import cognitoUtils from "../../../utils/cognitoUtils";
import {sessionProps} from "../../../types";
export const CLEAR_SESSION = "CLEAR_SESSION";
export const SET_SESSION = "SET_SESSION";
export const clearSession = () => ({
  type: CLEAR_SESSION,
});

// Initialise the Cognito sesson from a callback href
export const initSessionFromCallbackURI = (callbackHref: string) => {
  return async (
    dispatch: (arg0: { type?: string; session?: unknown }) => void
  ) => {
    await cognitoUtils.parseCognitoWebResponse(callbackHref); // parse the callback URL
    const session: sessionProps | any = await cognitoUtils.getCognitoSession();
    dispatch({ type: SET_SESSION, session });
  };
};

export const setSession = (session: any) => ({
  type: SET_SESSION,
  session,
});
