import * as types from "../actionTypes/postActionTypes";

export const createPostInit = (payload: object) => ({
  type: types.CREATE_POST_INIT,
  payload
});

export const createPostSuccess = (payload: object) => ({
  type: types.CREATE_POST_SUCCESS,
  payload
});

export const createPostFailure = (error: object) => ({
  type: types.CREATE_POST_FAILURE,
  error
});

export const getPostsInit = () => ({
  type: types.GET_POSTS_INIT
});

export const getPostsSuccess = (payload: object) => ({
  type: types.GET_POSTS_SUCCESS,
  payload
});

export const getPostsFailure = (error: object) => ({
  type: types.GET_POSTS_FAILURE,
  error
});
