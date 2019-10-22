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
