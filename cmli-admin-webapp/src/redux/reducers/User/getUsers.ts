import {
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_REQUEST,
  } from "../../actions/User/getUsers";
  
  const getUsers = (state = "", action: any) => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        return Object.assign({}, action.payload);
  
      case GET_USERS_ERROR:
        return action.payload;
  
      case GET_USERS_REQUEST:
        return true;
  
      default:
        return state;
    }
  };
  export default getUsers;
  