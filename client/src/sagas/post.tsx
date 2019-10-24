import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/postActions";
import * as types from "../actionTypes/postActionTypes";
import api from "../api/api";

export function* getPosts(action) {
  try {
    const posts = yield call(api.post.getPosts);
    console.log(posts);

    yield put(actionTypes.getPostsSuccess(posts));
  } catch (error) {
    console.log(error);
    yield put(actionTypes.getPostsFailure(error.response.data.meta.message));
  }
}
export function* createPost(action) {
  try {
    const post = yield call(api.post.createPost, action.payload);
    console.log(post);

    yield put(actionTypes.createPostSuccess(post));
  } catch (error) {
    console.log(error);
    yield put(actionTypes.createPostFailure(error.response.data.meta.message));
  }
}

export function* watchPosts() {
  yield takeLatest(types.GET_POSTS_INIT, getPosts);
}
export function* watchCreatePost() {
  yield takeLatest(types.CREATE_POST_INIT, createPost);
}

// export function*
export default function*() {
  yield fork(watchPosts);
  yield fork(watchCreatePost);
}
