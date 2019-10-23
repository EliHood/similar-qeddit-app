import produce from "immer";
import * as types from "../actionTypes/userActionTypes";
import { sessionData } from "../utils";

export interface userState {
  isAuthenticated: boolean;
  error?: string;
  currentUser: object;
}

const initialState: userState = {
  isAuthenticated: false,
  error: "",
  currentUser: {}
};

const authReducer = (state = initialState, action: any): userState =>
  produce(state, draft => {
    switch (action.type) {
      case types.SIGN_UP_SUCCESS:
        console.log(action);
        draft.isAuthenticated = sessionData.getLoginStatus();
        return;
      case types.FETCH_AUTO_LOGIN_SUCCESS:
        sessionData.getLoginStatus();
        console.log(action);
        return;
      case types.LOG_OUT_SUCCESS:
        console.log(action);
        draft.isAuthenticated = false;
        return;
      case types.LOG_IN_SUCCESS:
        console.log(action);
        draft.error = "";
        draft.isAuthenticated = sessionData.getLoginStatus();
        return;
      case types.LOG_IN_FAILURE:
        console.log(action.error);
        draft.error = action.error;
        return;
    }
  });

export default authReducer;
