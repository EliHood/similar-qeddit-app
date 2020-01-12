import jwtDecode from "jwt-decode";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/userActions";
import * as types from "../actionTypes/userActionTypes";
import api from "../api/api";
import { sessionData, setAuthToken } from "../utils";
import { history } from "../ourHistory";
export function* registerUser(action) {
  try {
    console.log(action);
    const user = yield call(api.user.signUp, action.payload);
    console.log(user);
    const token = user.meta.token;
    setAuthToken(token);
    sessionData.setUserLoggedIn(token);
    const decoded = jwtDecode(token);

    yield put(actionTypes.signUpSuccess(decoded));
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
    const token = login.token;
    setAuthToken(token);
    sessionData.setUserLoggedIn(token);
    yield put(actionTypes.getUserSuccess(token));
  } catch (error) {
    yield put(actionTypes.getUserFailure(error));
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
    yield put(
      actionTypes.updateUserProfileFailure(err.response.data.meta.message)
    );
  }
}

export function* logOut() {
  try {
    const logout = yield call(api.user.logOut);
    sessionData.setUserLoggdOut();
    localStorage.removeItem('CurrentUserId')
    history.push("/");
    yield put(actionTypes.logOutSuccess(logout));
  } catch (error) {
    yield put(actionTypes.logOutFailure(error));
  }
}

export function* login(action) {
  try {
    const login = yield call(api.user.logIn, action.payload);
    console.log(login);
    const token = login.meta.token;
    console.log(token);
    sessionData.setUserLoggedIn(token);
    const decoded = jwtDecode(token);
    setAuthToken(token);
    console.log(login.user)
    sessionData.currentUser(login.user.id.toString())
    yield put(actionTypes.getCurrentUser(login.user));

    yield put(actionTypes.loginSuccess(decoded));
  } catch (err) {
    const errMsg = err.response.data.meta.message;
    yield put(actionTypes.loginFailure(errMsg));
  }
}

export function* watchLogin() {
  yield takeLatest(types.LOG_IN_INIT, login);
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
export default function*() {
  yield fork(watchUserRegister);
  yield fork(watchAuthLogin);
  yield fork(watchLogout);
  yield fork(watchLogin);
  yield fork(watchEditProfile);
  yield fork(watchUpdateProfile);
}
