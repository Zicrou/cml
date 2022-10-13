import axios from "axios";
import readLocalStorage from "../../../utils/readLocalStorage";
import { tokenAuthFailedAction } from "../Auth/handleUnauthorizedRoutes";
import { pdfProp } from "../../../types"
export const GENERATE_PDF_SUCCESS = "GENERATE_PDF_SUCCESS";
export const GENERATE_PDF_ERROR = "GENERATE_PDF_ERROR";
export const GENERATE_PDF_REQUEST = "GENERATE_PDF_REQUEST ";

export const generatePDF = (prop: pdfProp) => (dispatch: any) => {
  dispatch({ type: GENERATE_PDF_REQUEST });
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_API_BASE}/v1/events/${prop.eventId}/generate_pdf`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-token": readLocalStorage("access-token"),
      "men-data": prop.menData,
      "women-data": prop.womenData,
    },
  })
    .then((response) => {
      return dispatch({
        type: GENERATE_PDF_SUCCESS,
        payload: response,
      });
    })
    .catch((error: { response: any }) => {
      if (error.response.status === 401) {
        dispatch(tokenAuthFailedAction());
      }
      return dispatch({
        type: GENERATE_PDF_ERROR,
        payload: error.response,
      });
    });
};
