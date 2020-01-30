import { call, fork, put, takeEvery, take, takeLatest } from "redux-saga/effects";
import { eventChannel } from 'redux-saga';
import * as actionTypes from "../actions/postActions";
import * as types from "../actionTypes/postActionTypes";
import api from "../api/api";
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
function createEventChannel(pusher: Pusher.Pusher) {
  return eventChannel((emitter) => {
    const channel = pusher.subscribe('notification');
    channel.bind('my-event', (data: string) => {
      console.log(data)
      // we need an emitter for notificationSuccess method to work
      emitter(data);
      toast.success(data);
    })
    return () => channel.unbind('my-event', emitter);
  });
}

export function* getNotification() {
  try {
    const pusherClient = new Pusher('0d45d56558d5bdcbc179', {
      cluster: 'us2',
      forceTLS: true
    });
    const channel = yield call(createEventChannel, pusherClient);
    while (true) {
      const data = yield take(channel);
      yield put(actionTypes.notificationSuccess(data))
    }
  } catch (err) {
    yield put(actionTypes.notificationFailure(err))
  }
}


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
  const deleteConfirmation = window.confirm('Are you sure you want to delete your post ?')
  if (deleteConfirmation) {
    try {
      const deletePost = yield call(api.post.deletePost, action.payload, action.userId);
      yield put(actionTypes.deletePostSuccess(deletePost, action.payload));
    } catch (error) {
      yield put(actionTypes.dislikePostFailiure(error));
    }

  } else {
    return null
  }

}

export function* postComment(action) {
  try {
    const data = yield call(api.post.postComment, action.payload);
    yield put(actionTypes.postCommentSuccess(data.comment, action.payload.id));
  } catch (error) {
    yield put(actionTypes.postCommentFailure(error.response.data));
  }
}

export function* deleteComment(action) {
  const deleteConfirmation = window.confirm('Are you sure you want to delete your comment ?')
  console.log(action)
  if (deleteConfirmation) {
    try {
      const deleteComment = yield call(api.post.deleteComment, action.payload, action.userId);
      yield put(actionTypes.deleteCommentSuccess(deleteComment, action.payload, action.postId));
    } catch (error) {
      yield put(actionTypes.deleteCommentFailure(error));
    }
  } else {
    return null
  }

}

export function* watchFetchPost() {
  yield takeLatest(types.FETCH_POST_INIT, fetchPost);
}
// dont use a watcher for notifications, it will keep calling itself
// export function* watchNotifications() {
//   yield takeEvery(types.INIT_NOTIFICATION, getNotification)
// }

export function* watchDeletePost() {
  yield takeLatest(types.DELETE_POST_INIT, deletePost);
}
export function* watchDeleteComment() {
  yield takeLatest(types.DELETE_COMMENT_INIT, deleteComment);
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
export default function* () {
  yield fork(watchPosts);
  yield fork(getNotification)
  yield fork(watchPostComment);
  yield fork(watchDeletePost);
  yield fork(watchFetchPost);
  yield fork(watchDeleteComment)
  yield fork(watchCreatePost);
  yield fork(watchLikePost);
  yield fork(watchdisLikePost);
}
