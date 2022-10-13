import {
  GET_ANSWERS_SUCCESS,
  GET_ANSWERS_ERROR,
  GET_ANSWERS_REQUEST,
} from "../../actions/Answers/get";

const getAnswers = (state = "", action: any) => {
  switch (action.type) {
    case GET_ANSWERS_SUCCESS:
      return Object.assign({}, action.payload);

    case GET_ANSWERS_ERROR:
      return action.payload;

    case GET_ANSWERS_REQUEST:
      return true;

    default:
      return state;
  }
};
export default getAnswers;
