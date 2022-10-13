import { CognitoAuth } from "amazon-cognito-auth-js/dist/amazon-cognito-auth";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { config as AWSConfig } from "aws-sdk";

AWSConfig.region = `${process.env.REACT_APP_AWS_REGION}`;

// Creates a CognitoAuth instance
const createCognitoAuth = () => {
  const baseUri = process.env.REACT_APP_LOGIN_HOST || "";
  const appWebDomain = baseUri.replace("https://", "").replace("http://", "");
  const auth = new CognitoAuth({
    UserPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
    ClientId: `${process.env.REACT_APP_CLIENT_ID}`,
    AppWebDomain: appWebDomain,
    TokenScopesArray: ["openid", "email", "aws.cognito.signin.user.admin"],
    RedirectUriSignIn: `${process.env.REACT_APP_POST_LOGIN_URL}`,
    RedirectUriSignOut: `${process.env.REACT_APP_LOGOUT_URL}`,
  });
  return auth;
};

// Creates a CognitoUser instance
const createCognitoUser = () => {
  const pool = createCognitoUserPool();
  return pool.getCurrentUser();
};

// Creates a CognitoUserPool instance
const createCognitoUserPool = () =>
  new CognitoUserPool({
    UserPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
    ClientId: `${process.env.REACT_APP_CLIENT_ID}`,
  });

// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = (href: string) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth() || "";

    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result: any) {
        resolve(result);
      },
      onFailure: function (err: string) {
        window.location.replace("/login");
        reject(new Error("Failure parsing Cognito web response: " + err));
      },
    };
    auth.parseCognitoWebResponse(href);
  });
};

// Gets a new Cognito session. Returns a promise.
const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser();
    cognitoUser!.getSession((err: any, result: any) => {
      if (err || !result) {
        reject(new Error("Failure getting Cognito session: " + err));
        return;
      }
      // Resolve the promise with the session credentials
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token,
        },
        user: {
          userName: result.idToken.payload["cognito:username"],
          email: result.idToken.payload.email,
        },
      };
      localStorage.setItem("access-token", result.accessToken.jwtToken);
      resolve(session);
    });
  });
};

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = createCognitoAuth();
  localStorage.removeItem("access-token");
  auth.signOut();
};

const exportObject = {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  getCognitoSession,
  parseCognitoWebResponse,
  signOutCognitoSession,
};
export default exportObject;
