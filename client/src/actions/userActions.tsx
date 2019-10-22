import * as types from "../actionTypes/userActionTypes";

export const signUpInit = (payload: object) => ({
  type: types.SIGN_UP_INIT,
  payload
});

export const signUpSuccess = (payload: object) => ({
  type: types.SIGN_UP_SUCCESS,
  payload
});

export const signUpFailure = (error: object) => ({
  type: types.SIGN_UP_FAILURE,
  error
});
