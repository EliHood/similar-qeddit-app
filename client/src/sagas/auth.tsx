import jwtDecode from "jwt-decode";
import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/userActions";
import * as types from "../actionTypes/userActionTypes";
import api from "../api/api";
import { sessionData } from "../utils";
export function* registerUser(action) {
  try {
    console.log(action);
    const user = yield call(api.user.signUp, action.payload);
    console.log(user);
    const token = user.meta.token;
    console.log(token);
    sessionData.setUserLoggedIn(token);
    const decoded = jwtDecode(token);

    yield put(actionTypes.signUpSuccess(decoded));
  } catch (error) {
    yield put(actionTypes.signUpFailure(error));
  }
}
export function* getAutoLoginStatus(action) {
  try {
    const login = yield call(api.user.autoLogin);
    console.log(login);
    yield put(actionTypes.fetchAuthAuthSuccess(login));
  } catch (error) {
    yield put(actionTypes.fetchAuthAuthFailure(error));
  }
}

export function* logOut() {
  try {
    const logout = yield call(api.user.logOut);
    sessionData.setUserLoggdOut();
    yield put(actionTypes.logOutSuccess(logout));
  } catch (error) {
    yield put(actionTypes.signUpFailure(error));
  }
}

export function* watchAuthLogin() {
  yield takeLatest(types.FETCH_AUTO_LOGIN, getAutoLoginStatus);
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
}
