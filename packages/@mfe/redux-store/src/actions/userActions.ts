import { userActionTypes } from '../actionTypes'

export const emailConfirmationInit = <T>(payload: T) => ({
    type: userActionTypes.EMAIL_CONFIRMATION_INIT,
    payload,
})

export const emailConfirmationSuccess = (payload: object) => ({
    type: userActionTypes.EMAIL_CONFIRMATION_SUCCESS,
    payload,
})

export const emailConfirmationFailure = (error: object) => ({
    type: userActionTypes.EMAIL_CONFIRMATION_FAILURE,
    error,
})

export const setDark = () => ({
    type: userActionTypes.SET_DARK,
})

export const resendEmailConfirmationInit = () => ({
    type: userActionTypes.RESEND_EMAIL_CONFIRMATION_INIT,
})

export const resendEmailConfirmationSuccess = (payload: object) => ({
    type: userActionTypes.RESEND_EMAIL_CONFIRMATION_SUCCESS,
    payload,
})

export const resendEmailConfirmationFailure = (error: object) => ({
    type: userActionTypes.RESEND_EMAIL_CONFIRMATION_FAILURE,
    error,
})

export const signUpInit = (payload: object, navigate: any) => ({
    type: userActionTypes.SIGN_UP_INIT,
    payload,
    navigate,
})

export const signUpSuccess = (payload: object, user: object) => ({
    type: userActionTypes.SIGN_UP_SUCCESS,
    payload,
    user,
})

export const signUpFailure = (error: object) => ({
    type: userActionTypes.SIGN_UP_FAILURE,
    error,
})

export const fetchAutoAuthInit = () => ({
    type: userActionTypes.FETCH_AUTO_LOGIN,
})

export const fetchAuthAuthSuccess = (payload: object) => ({
    type: userActionTypes.FETCH_AUTO_LOGIN_SUCCESS,
    payload,
})

export const fetchAuthAuthFailure = (error: object) => ({
    type: userActionTypes.FETCH_AUTO_LOGIN_FAILURE,
    error,
})

export const logOutInit = (history: object) => ({
    type: userActionTypes.LOG_OUT_INIT,
    history,
})

export const logOutSuccess = (payload: object) => ({
    type: userActionTypes.LOG_OUT_SUCCESS,
    payload,
})

export const logOutFailure = (error: object) => ({
    type: userActionTypes.LOG_OUT_FAILURE,
    error,
})

export const loginInit = (payload: object, history: object) => ({
    type: userActionTypes.LOG_IN_INIT,
    payload,
    history,
})

export const loginSuccess = (payload: object) => ({
    type: userActionTypes.LOG_IN_SUCCESS,
    payload,
})

export const loginFailure = (error: string) => ({
    type: userActionTypes.LOG_IN_FAILURE,
    error,
})

export const getUser = () => ({
    type: userActionTypes.GET_USER,
})

export const getUserSuccess = (payload: object) => ({
    type: userActionTypes.GET_USER_SUCCESS,
    payload,
})

export const getUserFailure = (error: string) => ({
    type: userActionTypes.GET_USER_FAILURE,
    error,
})

export const getUserProfile = () => ({
    type: userActionTypes.GET_USER_PROFILE,
})

export const getUserProfileSuccess = (payload: object) => ({
    type: userActionTypes.GET_USER_PROFILE_SUCCESS,
    payload,
})

export const getUserProfileFailure = (error: string) => ({
    type: userActionTypes.GET_USER_PROFILE_FAILURE,
    error,
})

export const updateUserProfile = (payload: object) => ({
    type: userActionTypes.UPDATE_USER_PROFILE,
    payload,
})

export const updateUserProfileSuccess = (payload: object) => ({
    type: userActionTypes.UPDATE_USER_PROFILE_SUCCESS,
    payload,
})

export const updateUserProfileFailure = (error: string) => ({
    type: userActionTypes.UPDATE_USER_PROFILE_FAILURE,
    error,
})

export const addUsername = (data: string) => ({
    type: userActionTypes.ADD_USERNAME,
    data,
})

export const addEmail = (data: string) => ({
    type: userActionTypes.ADD_EMAIL,
    data,
})

export const addPasswordConf = (data: string) => ({
    type: userActionTypes.ADD_PASSWORD_CONF,
    data,
})

export const addPassword = (data: string) => ({
    type: userActionTypes.ADD_PASSWORD,
    data,
})

export const initLogin = () => ({
    type: userActionTypes.INIT_LOGIN,
})

export const getProfileInit = (data: string) => ({
    type: userActionTypes.GET_PROFILE_INIT,
    data,
})

export const getProfileSuccess = (data: string) => ({
    type: userActionTypes.GET_PROFILE_SUCCESS,
    data,
})

export const getProfileFailure = (err: object) => ({
    type: userActionTypes.GET_USER_PROFILE_FAILURE,
    err,
})

export const followUserInit = (data: string, id: number) => ({
    type: userActionTypes.FOLLOW_USER_INIT,
    data,
    id,
})

export const followUserSuccess = (payload: object, id: number) => ({
    type: userActionTypes.FOLLOW_USER_SUCCESS,
    payload,
    id,
})

export const followUserFailure = (err: object) => ({
    type: userActionTypes.FOLLOW_USER_FAILURE,
    err,
})

export const unfollowUserInit = (data: string, id: number) => ({
    type: userActionTypes.UNFOLLOW_USER_INIT,
    data,
    id,
})

export const unfollowUserSuccess = (payload: object, id: number) => ({
    type: userActionTypes.UNFOLLOW_USER_SUCCESS,
    payload,
    id,
})

export const unfollowUserFailure = (err: object) => ({
    type: userActionTypes.UNFOLLOW_USER_FAILURE,
    err,
})

export const initGetNotifications = (payload: number) => ({
    type: userActionTypes.INIT_GET_NOTIFICATIONS,
    payload,
})

export const getNotificationsSuccess = (payload: object) => ({
    type: userActionTypes.GET_NOTIFICATIONS_SUCCESS,
    payload,
})

export const getNotificationsFailure = (err: object) => ({
    type: userActionTypes.GET_NOTIFICATIONS_FAILURE,
    err,
})

export const markAsReadInit = (payload: number) => ({
    type: userActionTypes.MARK_AS_READ_INIT,
    payload,
})

export const markAsReadSuccess = (payload: object, id: number) => ({
    type: userActionTypes.MARK_AS_READ_SUCCESS,
    payload,
    id,
})

export const markAsReadFailure = (err: object) => ({
    type: userActionTypes.MARK_AS_READ_FAILURE,
    err,
})
