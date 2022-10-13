import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
export const GET_ANSWERS_SUCCESS = "GET_ANSWERS_SUCCESS";
export const GET_ANSWERS_ERROR = "GET_ANSWERS_ERROR";
export const GET_ANSWERS_REQUEST = "GET_ANSWERS_REQUEST ";

export const getAnswers = (userId: any) => (dispatch: any) => {
  dispatch({ type: GET_ANSWERS_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/users/${userId}/answers`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
    },
  })
    .then((response: { status: any }) => {
      return dispatch({
        type: GET_ANSWERS_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GET_ANSWERS_ERROR,
        payload: error.response,
      });
    });
};
