import { call, fork, put, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import api from '../api/api'
import setAuthToken from '../utils/setAuthToken'
import sessionData from '../utils/sessionData'

import * as actionTypes from '../actions/userActions'
import * as types from '../actionTypes/userActionTypes'

export function* registerUser(action: any) {
    try {
        const { navigate } = action
        const user = yield call(api.user.signUp, action.payload)
        yield put(actionTypes.signUpSuccess({}, user))
        navigate('/emailConfirmation', {state: user})

    } catch (error) {
        const errMsg = error.response.data.meta.message
        yield put(actionTypes.signUpFailure(errMsg))
    }
}
export function* getAutoLoginStatus(action) {
    try {
        const autoLogin = yield call(api.user.currentUser)
        const { token, user } = autoLogin

        if (user && user.googleId !== null) {
            localStorage.setItem('googleId', user?.googleId)
        }
        setAuthToken(token)
        sessionData.setUserLoggedIn(token)
        yield put(actionTypes.getUserSuccess(autoLogin))
    } catch (error) {
        localStorage.clear()
        yield put(actionTypes.getUserFailure(error.response.data.message))
    }
}

export function* getUserProfile() {
    try {
        const profile = yield call(api.user.editProfile)
        yield put(actionTypes.getUserProfileSuccess(profile))
    } catch (error) {
        yield put(actionTypes.getUserProfileFailure(error))
    }
}

export function* updateUserProfile(action) {
    try {
        const profile = yield call(api.user.updateProfile, action.payload)
        yield put(actionTypes.updateUserProfileSuccess(profile))
    } catch (err) {
        yield put(
            actionTypes.updateUserProfileFailure(err.response.data.meta.message)
        )
    }
}

export function* logOut(action: any) {
    try {
        const { history } = action
        const logout = yield call(api.user.logOut)
        sessionData.setUserLoggdOut()
        localStorage.removeItem('CurrentUserId')
        localStorage.removeItem('email_verified')
        localStorage.removeItem('googleId')
        yield put(actionTypes.logOutSuccess(logout))
        history.push('/login')
    } catch (error) {
        yield put(actionTypes.logOutFailure(error))
    }
}

export function* login(action) {
    try {
        const autoLogin = yield call(api.user.logIn, action.payload)
        const {
            meta: { token },
            user,
        } = autoLogin
        sessionData.setUserLoggedIn(token)
        const decoded = jwtDecode(token) as any
        setAuthToken(token)
        if (user?.email_verified !== null) {
            localStorage.setItem(
                'email_verified',
                user.email_verified.toString()
            )
        }
        // localStorage.setItem('email_verified', user.email_verified.toString())
        yield put(actionTypes.loginSuccess(decoded))
    } catch (err) {
        const errMsg = err?.response?.data?.meta?.message
        yield put(actionTypes.loginFailure(errMsg))
    }
}

export function* emailConfirmation(action) {
    try {
        const callEmailConfirmation = yield call(
            api.user.emailConfirmation,
            action.payload.userId,
            action.payload.token
        )
        yield put(actionTypes.emailConfirmationSuccess(callEmailConfirmation))
    } catch (err) {
        yield put(
            actionTypes.emailConfirmationFailure(err.response.data.meta.message)
        )
    }
}

export function* getProfile(action) {
    try {
        const profile = yield call(api.user.getProfile, action.data)
        yield put(actionTypes.getProfileSuccess(profile))
    } catch (err) {
        yield put(actionTypes.getProfileFailure(err))
    }
}

export function* followUser(action) {
    try {
        const follow = yield call(api.user.followUser, action.data)
        yield put(actionTypes.followUserSuccess(follow, action.id))
    } catch (err) {
        yield put(actionTypes.followUserFailure(err))
    }
}

export function* unfollowUser(action) {
    try {
        const unfollow = yield call(api.user.unfollowUser, action.data)
        yield put(actionTypes.unfollowUserSuccess(unfollow, action.id))
    } catch (err) {
        yield put(actionTypes.followUserFailure(err))
    }
}

export function* resendEmailConfirmation(action) {
    try {
        const callResendEmailConfirmation = yield call(
            api.user.resendConfirmation
        )
        yield put(
            actionTypes.resendEmailConfirmationSuccess(
                callResendEmailConfirmation
            )
        )
    } catch (err) {
        yield put(actionTypes.resendEmailConfirmationFailure(err))
    }
}

export function* getNotifications(action) {
    try {
        const notifications = yield call(
            api.user.getNotifications,
            action.payload
        )
        yield put(actionTypes.getNotificationsSuccess(notifications))
    } catch (err) {
        yield put(actionTypes.getNotificationsFailure(err))
    }
}

export function* markAsRead(action) {
    try {
        const mark = yield call(api.user.markAsRead, action.payload)
        yield put(actionTypes.markAsReadSuccess(mark, action.payload))
    } catch (err) {
        yield put(actionTypes.markAsReadFailure(err))
    }
}

export function* watchNotifications() {
    yield takeLatest(types.INIT_GET_NOTIFICATIONS, getNotifications)
}

export function* watchMarkAsRead() {
    yield takeLatest(types.MARK_AS_READ_INIT, markAsRead)
}

export function* watchLogin() {
    yield takeLatest(types.LOG_IN_INIT, login)
}

export function* watchFollowUser() {
    yield takeLatest(types.FOLLOW_USER_INIT, followUser)
}
export function* watchUnFollowUser() {
    yield takeLatest(types.UNFOLLOW_USER_INIT, unfollowUser)
}

export function* watchProfile() {
    yield takeLatest(types.GET_PROFILE_INIT, getProfile)
}

export function* watchResendEmailConfirmation() {
    yield takeLatest(
        types.RESEND_EMAIL_CONFIRMATION_INIT,
        resendEmailConfirmation
    )
}
export function* watchEmailConfirmation() {
    yield takeLatest(types.EMAIL_CONFIRMATION_INIT, emailConfirmation)
}
export function* watchUpdateProfile() {
    yield takeLatest(types.UPDATE_USER_PROFILE, updateUserProfile)
}
export function* watchEditProfile() {
    yield takeLatest(types.GET_USER_PROFILE, getUserProfile)
}
export function* watchAuthLogin() {
    yield takeLatest(types.GET_USER, getAutoLoginStatus)
}
export function* watchUserRegister() {
    yield takeLatest(types.SIGN_UP_INIT, registerUser)
}
export function* watchLogout() {
    yield takeLatest(types.LOG_OUT_INIT, logOut)
}
// export function*
export default function* () {
    yield fork(watchUserRegister)
    yield fork(watchMarkAsRead)
    yield fork(watchNotifications)
    yield fork(watchAuthLogin)
    yield fork(watchFollowUser)
    yield fork(watchUnFollowUser)
    yield fork(watchResendEmailConfirmation)
    yield fork(watchProfile)
    yield fork(watchLogout)
    yield fork(watchLogin)
    yield fork(watchEmailConfirmation)
    yield fork(watchEditProfile)
    yield fork(watchUpdateProfile)
}
