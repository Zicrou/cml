import {
  GENERATE_PDF_SUCCESS,
  GENERATE_PDF_ERROR,
  GENERATE_PDF_REQUEST,
} from "../../actions/GeneratePdf/generatePdf";

const generatePDF = (state = "", action: any) => {
  switch (action.type) {
    case GENERATE_PDF_SUCCESS:
      return Object.assign({}, action.payload);

    case GENERATE_PDF_ERROR:
      return action.payload;

    case GENERATE_PDF_REQUEST:
      return true;

    default:
      return state;
  }
};
export default generatePDF;
