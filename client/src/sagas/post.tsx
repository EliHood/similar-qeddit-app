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
    yield put(actionTypes.createPostSuccess(post));
  } catch (error) {
    console.log(error);
    yield put(actionTypes.createPostFailure(error.response.data.meta.message));
  }
}

export function* likePost(action) {
  try {
    console.log(action);
    const like = yield call(api.post.likePost, action.payload);
    console.log(like);
    const id = action.payload;
    yield put(actionTypes.likePostSuccess({ like, id }));
  } catch (error) {
    console.log(error);
    yield put(actionTypes.likePostFailiure(error.response.data.meta.message));
  }
}
export function* dislikePost(action) {
  try {
    console.log(action);
    const dislike = yield call(api.post.dislikePost, action.payload);
    console.log(dislike);
    const id = action.payload;
    yield put(actionTypes.dislikePostSuccess({ dislike, id }));
  } catch (error) {
    console.log(error);
    yield put(
      actionTypes.dislikePostFailiure(error.response.data.meta.message)
    );
  }
}
export function* watchLikePost() {
  yield takeLatest(types.LIKE_POST_INIT, likePost);
}
export function* watchdisLikePost() {
  yield takeLatest(types.DISLIKE_POST_INIT, dislikePost);
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
  yield fork(watchLikePost);
  yield fork(watchdisLikePost);
}
