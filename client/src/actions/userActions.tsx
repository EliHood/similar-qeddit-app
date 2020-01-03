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

export const getUser = () => ({
  type: types.GET_USER
});

export const getUserSuccess = (payload: object) => ({
  type: types.GET_USER_SUCCESS,
  payload
});

export const getUserFailure = (error: string) => ({
  type: types.GET_USER_FAILURE,
  error
});

export const getUserProfile = () => ({
  type: types.GET_USER_PROFILE
});

export const getUserProfileSuccess = (payload: object) => ({
  type: types.GET_USER_PROFILE_SUCCESS,
  payload
});

export const getUserProfileFailure = (error: string) => ({
  type: types.GET_USER_PROFILE_FAILURE,
  error
});

export const updateUserProfile = (payload: object) => ({
  type: types.UPDATE_USER_PROFILE,
  payload
});

export const updateUserProfileSuccess = (payload: object) => ({
  type: types.UPDATE_USER_PROFILE_SUCCESS,
  payload
});

export const updateUserProfileFailure = (error: string) => ({
  type: types.UPDATE_USER_PROFILE_FAILURE,
  error
});

export const addUsername = (data:string) => ({
  type: types.ADD_USERNAME,
  data
})

export const addEmail = (data: string) => ({
  type: types.ADD_EMAIL,
  data
})
export const addPassword = (data: string) => ({
  type: types.ADD_PASSWORD,
  data
})