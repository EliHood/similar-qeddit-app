import { createSelector } from "reselect";
import { stat } from "fs";

// calling educer postInitialState, so it will have access to initialState properties
const postSelector = (state: any) => state.post;
const userSelector = (state: any) => state.user;

export const getPosts = () =>
    createSelector(
        postSelector,
        (state) => state.posts,
    );
export const userConfirmation = () =>
    createSelector(
        userSelector,
        (state) => state.message
    )
// will sort through original posts array by highest likeCount in DESC order, showing only 2
export const getPopPosts = () =>
    createSelector(
        postSelector,
        (state) => state.posts.filter((item) => item.likeCounts > 1).sort((a, b) => b.likeCounts - a.likeCounts).slice(0, 2),
    );
export const getUser = () =>
    createSelector(
        userSelector,
        (state) => state.currentUser,
    );
export const getTitleError = () =>
    createSelector(
        postSelector,
        (state) => state.titleError
    )
export const getBodyError = () =>
    createSelector(
        postSelector,
        (state) => state.bodyError
    )
export const title = () =>
    createSelector(
        postSelector,
        (state) => state.title
    )
export const postContent = () =>
    createSelector(
        postSelector,
        (state) => state.postContent
    )