import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/postActions";
import * as types from "../actionTypes/postActionTypes";
import api from "../api/api";

export function* getPosts(action) {
  try {
    const posts = yield call(api.post.getPosts);
    yield put(actionTypes.getPostsSuccess(posts));
  } catch (error) {
    console.log(error);
    yield put(actionTypes.getPostsFailure(error.response.data.meta.message));
  }
}

export function* fetchPost(action) {
  try {
    const postPage = yield call(api.post.getPost, action.payload);
    yield put(actionTypes.fetchPostSuccess(postPage));
  } catch (error) {
    yield put(actionTypes.fetchPostFailure(error));
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
      actionTypes.dislikePostFailiure(error.response.data.meta.message),
    );
  }
}

export function* deletePost(action) {
  try {
    const deletePost = yield call(api.post.deletePost, action.payload);
    yield put(actionTypes.deletePostSuccess(deletePost, action.payload));
  } catch (error) {
    yield put(actionTypes.dislikePostFailiure(error));
  }
}

export function* postComment(action) {
  try {
    const data = yield call(api.post.postComment, action.payload);
    console.log(data)
    yield put(actionTypes.postCommentSuccess(data.comment, action.payload.postId));
  } catch (error) {
    yield put(actionTypes.postCommentFailure(error.response.data));
  }
}

export function* watchFetchPost() {
  yield takeLatest(types.FETCH_POST_INIT, fetchPost);
}
export function* watchDeletePost() {
  yield takeLatest(types.DELETE_POST_INIT, deletePost);
}
export function* watchLikePost() {
  yield takeLatest(types.LIKE_POST_INIT, likePost);
}
export function* watchdisLikePost() {
  yield takeLatest(types.DISLIKE_POST_INIT, dislikePost);
}
export function* watchPostComment() {
  yield takeLatest(types.POST_COMMENT_INIT, postComment);
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
  yield fork(watchPostComment);
  yield fork(watchDeletePost);
  yield fork(watchFetchPost);
  yield fork(watchCreatePost);
  yield fork(watchLikePost);
  yield fork(watchdisLikePost);
}
