import produce from "immer";
import * as types from "../actionTypes/userActionTypes";
import { sessionData, validation } from "../utils";

export interface userState {
  isAuthenticated: boolean;
  error?: string;
  isLoading: boolean;
  profileData: object;
  message: string;
  usernameError: any;
  passwordError: any;
  emailError: any;
  email: string;
  password: string;
  username: string;
  currentUser: object;

}

const initialState: userState = {
  isAuthenticated: false,
  error: "",
  currentUser: {},
  profileData: {},
  isLoading: true,
  message: "",
  usernameError: "",
  passwordError: "",
  emailError: "",
  email: "",
  password: "",
  username: "",

};

const authReducer = (state = initialState, action: any): userState =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SIGN_UP_SUCCESS:
        console.log(action.user.meta.message);
        // draft.isAuthenticated = sessionData.getLoginStatus();
        draft.email = "";
        draft.password = "";
        draft.username = "";
        draft.error = "";
        draft.message = action.user.meta.message
        break;
      case types.SIGN_UP_FAILURE:
        console.log(action);
        draft.error = action.error;
        break;
      case types.GET_USER_SUCCESS:
        draft.isAuthenticated = sessionData.getLoginStatus();
        draft.currentUser = action.payload;
        break;
      case types.LOG_OUT_SUCCESS:
        draft.isAuthenticated = false;
        break;
      case types.LOG_IN_SUCCESS:
        draft.error = "";
        draft.isAuthenticated = sessionData.getLoginStatus();
        draft.isLoading = false;
        break;
      case types.INIT_LOGIN:
        draft.error = "";
        break;
      case types.LOG_IN_FAILURE:
        console.log(action.error);
        draft.error = action.error;
        break;
      case types.GET_USER_PROFILE_SUCCESS:
        draft.message = "";
        draft.profileData = action.payload;
        break;
      case types.GET_USER_PROFILE_FAILURE:
        draft.error = action.error;
        break;
      case types.UPDATE_USER_PROFILE_SUCCESS:
        draft.profileData = action.payload.user;
        draft.message = action.payload.message;
        break;
      case types.UPDATE_USER_PROFILE_FAILURE:
        console.log(action.error);
        draft.error = action.error;
        break;
      case types.ADD_EMAIL:
        console.log(validation.validateEmail(action.data));
        draft.email = action.data;
        draft.emailError = validation.validateEmail(action.data);
        break;
      case types.ADD_PASSWORD:
        draft.password = action.data;
        draft.passwordError = validation.validatePassword(action.data);
        break;
      case types.ADD_USERNAME:
        draft.username = action.data;
        draft.usernameError = validation.validateUsername(action.data);
        break;
      case types.EMAIL_CONFIRMATION_FAILURE:
        console.log(action)
        draft.error = action.error
        break
      case types.EMAIL_CONFIRMATION_SUCCESS:
        console.log(action)
        draft.message = action.payload.message
        break
      case types.RESEND_EMAIL_CONFIRMATION_SUCCESS:
        console.log(action.payload)
        draft.message = action.payload.meta.message
        break
      case types.RESEND_EMAIL_CONFIRMATION_FAILURE:
        draft.error = action.error
        break

    }
  });

export default authReducer;
