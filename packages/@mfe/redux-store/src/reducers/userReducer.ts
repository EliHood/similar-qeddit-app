import produce from 'immer'
import * as types from '../actionTypes/userActionTypes'
import sessionData from '../utils/sessionData'
import validation from '../utils/validation'
import { IUserState } from '../types'

const initialState: IUserState = {
    isAuthenticated: false,
    googleAccount: null,
    error: '',
    emailVerified: false,
    currentUser: {},
    profileData: {},
    profilePage: null,
    isLoading: true,
    message: '',
    usernameError: '',
    passwordError: '',
    emailError: '',
    email: '',
    password: '',
    passwordConf: '',
    passwordConfError: '',
    getNotifications: [],
    username: '',
    notDark: true,
}
const authReducer = (state = initialState, action: any): IUserState =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.SIGN_UP_SUCCESS:
                draft.email = ''
                draft.password = ''
                draft.username = ''
                draft.error = ''
                draft.message = action.user.meta.message
                draft.isAuthenticated = false
                break
            case types.SIGN_UP_FAILURE:
                draft.error = action.error
                break
            case types.GET_USER_SUCCESS:
                const loginStatus = sessionData.getLoginStatus()
                const emailVerified = sessionData.emailVerifiedStatus()
                const verified = !!(
                    loginStatus === true && emailVerified === true
                )
                draft.isAuthenticated = verified
                draft.googleAccount = sessionData.googleIdStatus()
                draft.currentUser = action.payload
                break
            case types.GET_USER_FAILURE:
                draft.isAuthenticated = false
                draft.googleAccount = null
                draft.currentUser = {}
                break
            case types.LOG_OUT_SUCCESS:
                draft.isAuthenticated = false
                draft.googleAccount = null
                draft.currentUser = {}
                break
            case types.LOG_IN_SUCCESS:
                const loginStatus2 = sessionData.getLoginStatus()
                const emailVerified2 = sessionData.emailVerifiedStatus()
                const verified2 = !!(
                    loginStatus2 === true && emailVerified2 === true
                )
                draft.error = ''
                draft.googleAccount = sessionData.googleIdStatus()
                draft.isAuthenticated = verified2
                draft.isLoading = false
                break
            case types.INIT_LOGIN:
                draft.error = ''
                break
            case types.LOG_IN_FAILURE:
                draft.error = action.error
                break
            case types.GET_USER_PROFILE_SUCCESS:
                draft.message = ''
                draft.profileData = action.payload
                break
            case types.GET_USER_PROFILE_FAILURE:
                draft.error = action.error
                break
            case types.UPDATE_USER_PROFILE_SUCCESS:
                draft.profileData = action.payload.user
                draft.message = action.payload.message
                break
            case types.UPDATE_USER_PROFILE_FAILURE:
                draft.error = action.error
                break
            case types.ADD_EMAIL:
                draft.email = action.data
                draft.emailError = validation.validateEmail(action.data)
                break
            case types.ADD_PASSWORD:
                draft.password = action.data
                draft.passwordError = validation.validatePassword(action.data)
                draft.passwordConf = ''
                draft.passwordConfError = ''
                break
            case types.ADD_PASSWORD_CONF:
                const { password } = state
                draft.passwordConf = action.data
                draft.passwordConfError = validation.validatePasswordConf(
                    action.data,
                    password
                )
                break
            case types.ADD_USERNAME:
                draft.username = action.data
                draft.usernameError = validation.validateUsername(action.data)
                break
            case types.EMAIL_CONFIRMATION_FAILURE:
                draft.error = action.error
                draft.emailVerified = false
                break
            case types.EMAIL_CONFIRMATION_SUCCESS:
                draft.message = action.payload.message
                break
            case types.RESEND_EMAIL_CONFIRMATION_SUCCESS:
                draft.message = action.payload.meta.message
                break
            case types.RESEND_EMAIL_CONFIRMATION_FAILURE:
                draft.error = action.error
                break
            case types.GET_PROFILE_SUCCESS:
                draft.profilePage = action.data
                break
            case types.GET_PROFILE_FAILURE:
                draft.error = action.error
                break
            case types.FOLLOW_USER_SUCCESS:
                const findKey = action.payload.follow.UserFollowers.findIndex(
                    (item: any) => item.followerId === action.id
                )
                draft.profilePage.UserFollowers = [
                    ...draft.profilePage.UserFollowers,
                    action.payload.follow.UserFollowers[findKey],
                ]
                draft.profilePage.isFollowing = true
                break
            case types.FOLLOW_USER_FAILURE:
                draft.error = action.error
                break
            case types.UNFOLLOW_USER_SUCCESS:
                draft.profilePage.UserFollowers = [
                    ...draft.profilePage.UserFollowers.filter(
                        (item: any) => item.followerId !== action.id
                    ),
                ]
                draft.profilePage.isFollowing = false
                break
            case types.UNFOLLOW_USER_FAILURE:
                draft.error = action.error
                break
            case types.GET_NOTIFICATIONS_SUCCESS:
                draft.getNotifications = action.payload
                break
            case types.GET_NOTIFICATIONS_FAILURE:
                draft.error = action.error
                break
            case types.MARK_AS_READ_SUCCESS:
                const markKey = state.getNotifications.findIndex(
                    (notification: any) =>
                        notification.notificationId === action.id
                )
                draft.getNotifications[markKey].status = [
                    ...action.payload.notifications[markKey].status,
                ]
                break
            case types.MARK_AS_READ_FAILURE:
                draft.error = action.error
                break
            case types.SET_DARK:
                draft.notDark = !draft.notDark
                break
            default:
                return state
        }
    })

export default authReducer
