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

export const fetchAutoAuthInit = () => ({
  type: types.FETCH_AUTO_LOGIN
});

export const fetchAuthAuthSuccess = (payload: object) => ({
  type: types.FETCH_AUTO_LOGIN_SUCCESS,
  payload
});

export const fetchAuthAuthFailure = (error: object) => ({
  type: types.FETCH_AUTO_LOGIN_FAILURE,
  error
});

export const logOutInit = () => ({
  type: types.LOG_OUT_INIT
});

export const logOutSuccess = (payload: object) => ({
  type: types.LOG_OUT_SUCCESS,
  payload
});

export const logOutFailure = (error: object) => ({
  type: types.LOG_OUT_FAILURE,
  error
});

export const loginInit = (payload: object) => ({
  type: types.LOG_IN_INIT,
  payload
});

export const loginSuccess = (payload: object) => ({
  type: types.LOG_IN_SUCCESS,
  payload
});

export const getCurrentUser = (payload: object) => ({
  type: types.GET_CURRENT_USER,
  payload
});

export const loginFailure = (error: string) => ({
  type: types.LOG_IN_FAILURE,
  error
});