import produce from "immer";
import * as types from "../actionTypes/userActionTypes";
import { type } from "os";
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
    }
  });

export default authReducer;
