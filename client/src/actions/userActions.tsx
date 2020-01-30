import * as types from "../actionTypes/userActionTypes";

export const emailConfirmationInit = (payload: object) => ({
    type: types.EMAIL_CONFIRMATION_INIT,
    payload,
});

export const emailConfirmationSuccess = (payload: object) => ({
    type: types.EMAIL_CONFIRMATION_SUCCESS,
    payload,
});

export const emailConfirmationFailure = (error: object) => ({
    type: types.EMAIL_CONFIRMATION_FAILURE,
    error,
});

export const resendEmailConfirmationInit = () => ({
    type: types.RESEND_EMAIL_CONFIRMATION_INIT,
});

export const resendEmailConfirmationSuccess = (payload: object) => ({
    type: types.RESEND_EMAIL_CONFIRMATION_SUCCESS,
    payload,
});

export const resendEmailConfirmationFailure = (error: object) => ({
    type: types.RESEND_EMAIL_CONFIRMATION_FAILURE,
    error,
});

export const signUpInit = (payload: object, history: object) => ({
    type: types.SIGN_UP_INIT,
    payload,
    history,
});

export const signUpSuccess = (payload: object, user: object) => ({
    type: types.SIGN_UP_SUCCESS,
    payload,
    user,
});

export const signUpFailure = (error: object) => ({
    type: types.SIGN_UP_FAILURE,
    error,
});

export const fetchAutoAuthInit = () => ({
    type: types.FETCH_AUTO_LOGIN,
});

export const fetchAuthAuthSuccess = (payload: object) => ({
    type: types.FETCH_AUTO_LOGIN_SUCCESS,
    payload,
});

export const fetchAuthAuthFailure = (error: object) => ({
    type: types.FETCH_AUTO_LOGIN_FAILURE,
    error,
});

export const logOutInit = (history: object) => ({
    type: types.LOG_OUT_INIT,
    history,
});

export const logOutSuccess = (payload: object) => ({
    type: types.LOG_OUT_SUCCESS,
    payload,
});

export const logOutFailure = (error: object) => ({
    type: types.LOG_OUT_FAILURE,
    error,
});

export const loginInit = (payload: object, history: object) => ({
    type: types.LOG_IN_INIT,
    payload,
    history,
});

export const loginSuccess = (payload: object) => ({
    type: types.LOG_IN_SUCCESS,
    payload,
});

export const getCurrentUser = () => ({
    type: types.GET_CURRENT_USER,
});

export const loginFailure = (error: string) => ({
    type: types.LOG_IN_FAILURE,
    error,
});

export const getUser = () => ({
    type: types.GET_USER,
});

export const getUserSuccess = (payload: object) => ({
    type: types.GET_USER_SUCCESS,
    payload,
});

export const getUserFailure = (error: string) => ({
    type: types.GET_USER_FAILURE,
    error,
});

export const getUserProfile = () => ({
    type: types.GET_USER_PROFILE,
});

export const getUserProfileSuccess = (payload: object) => ({
    type: types.GET_USER_PROFILE_SUCCESS,
    payload,
});

export const getUserProfileFailure = (error: string) => ({
    type: types.GET_USER_PROFILE_FAILURE,
    error,
});

export const updateUserProfile = (payload: object) => ({
    type: types.UPDATE_USER_PROFILE,
    payload,
});

export const updateUserProfileSuccess = (payload: object) => ({
    type: types.UPDATE_USER_PROFILE_SUCCESS,
    payload,
});

export const updateUserProfileFailure = (error: string) => ({
    type: types.UPDATE_USER_PROFILE_FAILURE,
    error,
});

export const addUsername = (data: string) => ({
    type: types.ADD_USERNAME,
    data,
});

export const addEmail = (data: string) => ({
    type: types.ADD_EMAIL,
    data,
});
export const addPassword = (data: string) => ({
    type: types.ADD_PASSWORD,
    data,
});

export const initLogin = () => ({
    type: types.INIT_LOGIN,
});

export const getProfileInit = (data: string) => ({
    type: types.GET_PROFILE_INIT,
    data,
});

export const getProfileSuccess = (data: string) => ({
    type: types.GET_PROFILE_SUCCESS,
    data,
});

export const getProfileFailure = (err: object) => ({
    type: types.GET_USER_PROFILE_FAILURE,
    err,
});

export const followUserInit = (data: string, id: number) => ({
    type: types.FOLLOW_USER_INIT,
    data,
    id,
});

export const followUserSuccess = (payload: object, id: number) => ({
    type: types.FOLLOW_USER_SUCCESS,
    payload,
    id,
});

export const followUserFailure = (err: object) => ({
    type: types.FOLLOW_USER_FAILURE,
    err,
});

export const unfollowUserInit = (data: string, id: number) => ({
    type: types.UNFOLLOW_USER_INIT,
    data,
    id,
});

export const unfollowUserSuccess = (payload: object, id: number) => ({
    type: types.UNFOLLOW_USER_SUCCESS,
    payload,
    id,
});

export const unfollowUserFailure = (err: object) => ({
    type: types.UNFOLLOW_USER_FAILURE,
    err,
});
