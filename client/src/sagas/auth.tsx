import { put, fork, takeLatest, call } from "redux-saga/effects";
import * as actionTypes from "../actions/userActions";
import * as types from "../actionTypes/userActionTypes";
import jwtDecode from "jwt-decode";
import { sessionData } from "../utils";
import api from "../api/api";
export function* registerUser(action) {
  try {
    const user = yield call(api.user.registerUser, action.userData);
    console.log(user);
    const { token } = user;

    sessionData.setUserLoggedIn(token);
    // setAuthToken(token);
    const decoded = jwtDecode(token);

    yield put(actionTypes.signUpSuccess(decoded));
  } catch (error) {
    yield put(actionTypes.signUpFailure(error));
  }
}

export function* watchUserRegister() {
  yield takeLatest(types.SIGN_UP_INIT, registerUser);
}
// export function*
export default function*() {
  yield fork(watchUserRegister);
}
