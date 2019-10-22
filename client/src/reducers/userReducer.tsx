import produce from "immer";
import * as types from "../actionTypes/userActionTypes";

export interface userState {
  isAuthenticated: boolean;
  error?: string;
}

const initialState: userState = {
  isAuthenticated: false,
  error: "",
};

const authReducer = (state = initialState, action: any): userState =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.SIGN_UP_SUCCESS:
        console.log(action);
        return;
    }
  });

export default authReducer;
