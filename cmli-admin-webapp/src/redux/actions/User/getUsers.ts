import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { GetUserProps } from "../../../types";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_ERROR = "GET_USERS_ERROR";
export const GET_USERS_REQUEST = "GET_USERS_REQUEST ";

export const getUsers = (filter: GetUserProps) => (dispatch: any) => {
  dispatch({ type: GET_USERS_REQUEST });
  return axios({
    method: "get",
    url: filter.status
      ? `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users?${filter.url}`
      : `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: GET_USERS_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_USERS_ERROR,
        payload: error,
      });
    });
};
