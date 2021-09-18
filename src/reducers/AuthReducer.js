import {
  CREATE_USER,
  LOGIN_USER,
  SIGN_OUT_USER,
  UPDATE_USER_STATUS,
} from "../actions/constables";

const AuthReducer = (
  state = {
    userLoggedIn: false
  },
  action
) => {
  switch (action.type) {
    case SIGN_OUT_USER:
      console.log(action.payload)
      return {
        userLoggedIn: false,
      };
    case UPDATE_USER_STATUS:
      return {
        userLoggedIn: action.payload.userLoggedIn,
      };
    case LOGIN_USER:
      console.log(action.payload)
      return {
        userLoggedIn: action.payload.userLoggedIn,
      };
    case CREATE_USER:
      return {
        userLoggedIn: action.payload.userLoggedIn,
      };
    default:
      return state;
  }
};

export default AuthReducer;
