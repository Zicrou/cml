import readLocalStorage from "../../../utils/readLocalStorage";

import axios from "axios";

export const TOKEN_AUTH_IN_PROGRESS = "TOKEN_AUTH_IN_PROGRESS";
export const TOKEN_AUTH_FAILED = "TOKEN_AUTH_FAILED";
export const TOKEN_AUTH_SUCCESSFUL = "TOKEN_AUTH_SUCCESSFUL";

export const tokenAuthFailedAction = () => ({
  type: TOKEN_AUTH_FAILED,
});

export const tokenAuthSuccessfulAction = () => ({
  type: TOKEN_AUTH_SUCCESSFUL,
});

export const TokenAuthThunk = () => (dispatch) => {
  if (readLocalStorage("access-token") !== undefined) {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/me`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "access-token": readLocalStorage("access-token"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(tokenAuthSuccessfulAction());
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          dispatch(tokenAuthFailedAction());
        }
      });
  } else {
    dispatch(tokenAuthFailedAction());
  }
};
