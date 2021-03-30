import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { runSaga } from "redux-saga";
import * as actionTypes from "../actions/postActions";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import * as types from "../actionTypes/postActionTypes";
import api from "../api/api";
import { getPosts, watchPosts, watchFetchPost, fetchPost } from "./post";

it("should test get posts error", () => {
    const error = new Error("Whoops");

    return expectSaga(getPosts)
        .provide([[call(api.post.getPosts), throwError(error)]])
        .put({ type: types.GET_POSTS_FAILURE, error })
        .run();
});

it("should test fetches posts", () => {
    const posts = { posts: [] };

    return expectSaga(watchPosts, api)
        .dispatch({ type: types.GET_POSTS_INIT }) // calls the di
        .provide([
            [call(api.post.getPosts), posts],
            [matchers.call.fn(api.post.getPosts), null],
        ]) //
        .put({
            type: types.GET_POSTS_SUCCESS,
            payload: posts,
        })

        .silentRun();
});

it("should get post", () => {
    const postId = 9;
    const post = {
        id: 0,
        postContent: "someStufff",
        createdAt: new Date(),
        author: {},
        Comments: [],
        Likes: [],
    };

    return expectSaga(fetchPost, api)
        .dispatch({ type: types.FETCH_POST_INIT })
        .provide([
            [call(api.post.getPost, postId), post],
            [matchers.call.fn(api.post.getPost), post],
        ])
        .put({
            type: types.FETCH_POST_SUCCESS,
            payload: post,
        })
        .silentRun();
});

it("should test fetch post error", () => {
    const postId = 9;
    const post = {
        id: 0,
        postContent: "someStufff",
        createdAt: new Date(),
        author: {},
        Comments: [],
        Likes: [],
    };
    const error = "Something went wrong";

    return expectSaga(fetchPost)
        .dispatch({ type: types.FETCH_POST_INIT })
        .provide([
            [call(api.post.getPost, postId), post],
            [matchers.call.fn(api.post.getPost), error],
        ])
        .put({ type: types.FETCH_POST_FAILURE, error })
        .run();
});
