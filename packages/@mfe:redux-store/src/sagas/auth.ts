import jwtDecode from 'jwt-decode';
import {
    call, fork, put, takeLatest,
} from 'redux-saga/effects';
import * as actionTypes from '../actions/userActions';
import * as types from '../actionTypes/userActionTypes';
import api from '../api/api';
import { setAuthToken } from '../utils';
import sessionData from '../utils/sessionData';

export function* registerUser(action: any) {
    try {
        console.log(action);
        const { history } = action;
        const user = yield call(api.user.signUp, action.payload);
        console.log(user);
        // const token = user.meta.token;
        // setAuthToken(token);
        // sessionData.setUserLoggedIn(token);
        // const decoded = jwtDecode(token);
        console.log(user);
        yield put(actionTypes.signUpSuccess({}, user));
        history.push({ pathname: '/emailConfirmation', state: user });
    } catch (error) {
        console.log(error);
        const errMsg = error.response.data.meta.message;
        console.log(errMsg);
        yield put(actionTypes.signUpFailure(errMsg));
    }
}
export function* getAutoLoginStatus(action) {
    try {
        const login = yield call(api.user.currentUser);
        const { token } = login;

        if (login.user.googleId !== null) {
            localStorage.setItem('googleId', login.user.googleId);
        }
        setAuthToken(token);
        sessionData.setUserLoggedIn(token);
        yield put(actionTypes.getUserSuccess(login));
    } catch (error) {
        localStorage.clear();
        yield put(actionTypes.getUserFailure(error.response.data.message));
    }
}

export function* getUserProfile() {
    try {
        const profile = yield call(api.user.editProfile);
        console.log(profile);
        yield put(actionTypes.getUserProfileSuccess(profile));
    } catch (error) {
        yield put(actionTypes.getUserProfileFailure(error));
    }
}

export function* updateUserProfile(action) {
    try {
        const profile = yield call(api.user.updateProfile, action.payload);
        yield put(actionTypes.updateUserProfileSuccess(profile));
    } catch (err) {
        yield put(actionTypes.updateUserProfileFailure(err.response.data.meta.message));
    }
}

export function* logOut(action:any) {
    try {
        const { history } = action;
        const logout = yield call(api.user.logOut);
        sessionData.setUserLoggdOut();
        localStorage.removeItem('CurrentUserId');
        localStorage.removeItem('email_verified');
        localStorage.removeItem('googleId');
        yield put(actionTypes.logOutSuccess(logout));
        history.push('/login');
    } catch (error) {
        yield put(actionTypes.logOutFailure(error));
    }
}

export function* login(action) {
    try {
        const login = yield call(api.user.logIn, action.payload);
        console.log('checking login', login);
        const { token } = login.meta;
        console.log(token);
        sessionData.setUserLoggedIn(token);
        const decoded = jwtDecode(token);
        setAuthToken(token);
        console.log('login saga', login.user.email_verified);

        if (login.user.email_verified !== null) {
            localStorage.setItem('email_verified', login.user.email_verified.toString());
        }
        yield put(actionTypes.loginSuccess(decoded));
    } catch (err) {
        const errMsg = err.response.data.meta.message;
        yield put(actionTypes.loginFailure(errMsg));
    }
}

export function* emailConfirmation(action) {
    try {
        const emailConfirmation = yield call(api.user.emailConfirmation, action.payload.userId, action.payload.token);

        console.log('email called', emailConfirmation);

        yield put(actionTypes.emailConfirmationSuccess(emailConfirmation));
    } catch (err) {
        console.log(err.response.data);
        console.log(err.response.data.meta.message);
        yield put(actionTypes.emailConfirmationFailure(err.response.data.meta.message));
    }
}

export function* getProfile(action) {
    try {
        const profile = yield call(api.user.getProfile, action.data);
        yield put(actionTypes.getProfileSuccess(profile));
    } catch (err) {
        yield put(actionTypes.getProfileFailure(err));
    }
}

export function* followUser(action) {
    try {
        const follow = yield call(api.user.followUser, action.data);
        console.log(follow);
        yield put(actionTypes.followUserSuccess(follow, action.id));
    } catch (err) {
        yield put(actionTypes.followUserFailure(err));
    }
}

export function* unfollowUser(action) {
    try {
        const unfollow = yield call(api.user.unfollowUser, action.data);
        console.log(unfollow);
        yield put(actionTypes.unfollowUserSuccess(unfollow, action.id));
    } catch (err) {
        yield put(actionTypes.followUserFailure(err));
    }
}

export function* resendEmailConfirmation(action) {
    try {
        const resendEmailConfirmation = yield call(api.user.resendConfirmation);
        console.log(resendEmailConfirmation);
        yield put(actionTypes.resendEmailConfirmationSuccess(resendEmailConfirmation));
    } catch (err) {
        console.log(err);
        yield put(actionTypes.resendEmailConfirmationFailure(err));
    }
}

export function* getNotifications(action) {
    try {
        const notifications = yield call(api.user.getNotifications, action.payload);
        yield put(actionTypes.getNotificationsSuccess(notifications));
    } catch (err) {
        yield put(actionTypes.getNotificationsFailure(err));
    }
}

export function* markAsRead(action) {
    console.log(action);

    try {
        const mark = yield call(api.user.markAsRead, action.payload);
        console.log(mark);
        yield put(actionTypes.markAsReadSuccess(mark, action.payload));
    } catch (err) {
        yield put(actionTypes.markAsReadFailure(err));
    }
}

export function* watchNotifications() {
    yield takeLatest(types.INIT_GET_NOTIFICATIONS, getNotifications);
}

export function* watchMarkAsRead() {
    yield takeLatest(types.MARK_AS_READ_INIT, markAsRead);
}

export function* watchLogin() {
    yield takeLatest(types.LOG_IN_INIT, login);
}

export function* watchFollowUser() {
    yield takeLatest(types.FOLLOW_USER_INIT, followUser);
}
export function* watchUnFollowUser() {
    yield takeLatest(types.UNFOLLOW_USER_INIT, unfollowUser);
}

export function* watchProfile() {
    yield takeLatest(types.GET_PROFILE_INIT, getProfile);
}

export function* watchResendEmailConfirmation() {
    yield takeLatest(types.RESEND_EMAIL_CONFIRMATION_INIT, resendEmailConfirmation);
}
export function* watchEmailConfirmation() {
    yield takeLatest(types.EMAIL_CONFIRMATION_INIT, emailConfirmation);
}
export function* watchUpdateProfile() {
    yield takeLatest(types.UPDATE_USER_PROFILE, updateUserProfile);
}
export function* watchEditProfile() {
    yield takeLatest(types.GET_USER_PROFILE, getUserProfile);
}
export function* watchAuthLogin() {
    yield takeLatest(types.GET_USER, getAutoLoginStatus);
}
export function* watchUserRegister() {
    yield takeLatest(types.SIGN_UP_INIT, registerUser);
}
export function* watchLogout() {
    yield takeLatest(types.LOG_OUT_INIT, logOut);
}
// export function*
export default function* () {
    yield fork(watchUserRegister);
    yield fork(watchMarkAsRead);
    yield fork(watchNotifications);
    yield fork(watchAuthLogin);
    yield fork(watchFollowUser);
    yield fork(watchUnFollowUser);
    yield fork(watchResendEmailConfirmation);
    yield fork(watchProfile);
    yield fork(watchLogout);
    yield fork(watchLogin);
    yield fork(watchEmailConfirmation);
    yield fork(watchEditProfile);
    yield fork(watchUpdateProfile);
}
