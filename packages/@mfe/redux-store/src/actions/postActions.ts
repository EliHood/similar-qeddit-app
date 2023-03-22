import { postActionTypes } from '../actionTypes'

export const createPostInit = (payload: object) => ({
    type: postActionTypes.CREATE_POST_INIT,
    payload,
})

export const createPostSuccess = (payload: object) => ({
    type: postActionTypes.CREATE_POST_SUCCESS,
    payload,
})

export const createPostFailure = (error: object) => ({
    type: postActionTypes.CREATE_POST_FAILURE,
    error,
})

export const getPostsInit = () => ({
    type: postActionTypes.GET_POSTS_INIT,
})

export const getPostsSuccess = (payload: object) => ({
    type: postActionTypes.GET_POSTS_SUCCESS,
    payload,
})

export const getPostsFailure = (error: object) => ({
    type: postActionTypes.GET_POSTS_FAILURE,
    error,
})

export const likePostInit = (payload: number) => ({
    type: postActionTypes.LIKE_POST_INIT,
    payload,
})

export const likePostSuccess = (payload: object) => ({
    type: postActionTypes.LIKE_POST_SUCCESS,
    payload,
})

export const likePostFailiure = (error: object) => ({
    type: postActionTypes.LIKE_POST_FAILURE,
    error,
})

export const dislikePostInit = (payload: number) => ({
    type: postActionTypes.DISLIKE_POST_INIT,
    payload,
})

export const dislikePostSuccess = (payload: object) => ({
    type: postActionTypes.DISLIKE_POST_SUCCESS,
    payload,
})

export const dislikePostFailiure = (error: object) => ({
    type: postActionTypes.DISLIKE_POST_FAILURE,
    error,
})

export const fetchPostInit = (payload: number) => ({
    type: postActionTypes.FETCH_POST_INIT,
    payload,
})

export const fetchPostSuccess = (payload: object) => ({
    type: postActionTypes.FETCH_POST_SUCCESS,
    payload,
})

export const fetchPostFailure = (error: object) => ({
    type: postActionTypes.FETCH_POST_FAILURE,
    error,
})

export const deletePostInit = (payload: number, userId: number) => ({
    type: postActionTypes.DELETE_POST_INIT,
    payload,
    userId,
})

export const deletePostSuccess = (payload: object, id: number) => ({
    type: postActionTypes.DELETE_POST_SUCCESS,
    payload,
    id,
})

export const deletePostFailure = (error: object) => ({
    type: postActionTypes.DELETE_POST_FAILURE,
    error,
})

export const postCommentInit = (payload: object) => ({
    type: postActionTypes.POST_COMMENT_INIT,
    payload,
})

export const deleteCommentInit = (
    payload: number,
    postId: number,
    userId: number
) => ({
    type: postActionTypes.DELETE_COMMENT_INIT,
    payload,
    postId,
    userId,
})

export const deleteCommentSuccess = (
    payload: object,
    id: number,
    postId: number
) => ({
    type: postActionTypes.DELETE_COMMENT_SUCCESS,
    payload,
    id,
    postId,
})

export const deleteCommentFailure = (error: object) => ({
    type: postActionTypes.DELETE_COMMENT_FAILURE,
    error,
})

export const postCommentSuccess = (payload: object, id: number) => ({
    type: postActionTypes.POST_COMMENT_SUCCESS,
    payload,
    id,
})

export const postCommentFailure = (error: object) => ({
    type: postActionTypes.POST_COMMENT_FAILURE,
    error,
})

export const addTitle = (data: string) => ({
    type: postActionTypes.ADD_TITLE,
    data,
})

export const addContent = (data: string) => ({
    type: postActionTypes.ADD_CONTENT,
    data,
})
export const notificationInit = () => ({
    type: postActionTypes.INIT_NOTIFICATION,
})

export const notificationSuccess = (payload: object) => ({
    type: postActionTypes.NOTIFICATION_SUCCESS,
    payload,
})

export const notificationFailure = (err: object) => ({
    type: postActionTypes.NOTIFICATION_FAILURE,
    err,
})

export const initCommentUpdates = () => ({
    type: postActionTypes.INIT_COMMENT_UPDATES,
})

export const commentUpdatesSuccess = (payload: object) => ({
    type: postActionTypes.COMMENT_UPDATES_SUCCESS,
    payload,
})

export const commentUpdatesFailure = (err: object) => ({
    type: postActionTypes.COMMENT_UPDATES_FAILURE,
    err,
})

export const editCommentInit = (payload) => ({
    type: postActionTypes.EDIT_COMMENT_INIT,
    payload,
})

export const editCommentSuccess = (payload: object) => ({
    type: postActionTypes.EDIT_COMMENT_SUCCESS,
    payload,
})

export const editCommentFailure = (err: object) => ({
    type: postActionTypes.EDIT_COMMENT_FAILURE,
    err,
})

export const repostPostInit = (payload: number, id: number) => ({
    type: postActionTypes.REPOST_POST_INIT,
    payload,
    id,
})

export const repostPostSuccess = (payload: object) => ({
    type: postActionTypes.REPOST_POST_SUCCESS,
    payload,
})

export const repostPostFailure = (error: object) => ({
    type: postActionTypes.REPOST_POST_FAILURE,
    error,
})

export const unrepostPostInit = (payload: number, id: number) => ({
    type: postActionTypes.UNREPOST_POST_INIT,
    payload,
    id,
})

export const unrepostPostSuccess = (payload: object) => ({
    type: postActionTypes.UNREPOST_POST_SUCCESS,
    payload,
})

export const unrepostPostFailure = (error: object) => ({
    type: postActionTypes.UNREPOST_POST_FAILURE,
    error,
})

export const commentReplyInit = (payload: object) => ({
    type: postActionTypes.COMMENT_REPLY_INIT,
    payload,
})

export const commentReplySuccess = (payload: object) => ({
    type: postActionTypes.COMMENT_REPLY_SUCCESS,
    payload,
})

export const commentReplyFailure = (error: object) => ({
    type: postActionTypes.COMMENT_REPLY_FAILURE,
    error,
})

export const deleteReplyInit = (payload: object) => ({
    type: postActionTypes.REPLY_DELETE_INIT,
    payload,
})

export const deleteReplySuccess = (payload: object) => ({
    type: postActionTypes.REPLY_DELETE_SUCCESS,
    payload,
})

export const deleteReplyFailure = (payload: object) => ({
    type: postActionTypes.REPLY_DELETE_FAILURE,
    payload,
})

export const searchPostsInit = (payload: string) => ({
    type: postActionTypes.SEARCH_POSTS_INIT,
    payload,
})

export const searchPostsSuccess = (payload: object) => ({
    type: postActionTypes.SEARCH_POSTS_SUCCESS,
    payload,
})

export const searchPostsFailure = (error: object) => ({
    type: postActionTypes.SEARCH_POSTS_FAILURE,
    error,
})

export const getSearchInit = (payload: string) => ({
    type: postActionTypes.GET_SEARCH_INIT,
    payload,
})

export const getSearchSuccess = (payload: object) => ({
    type: postActionTypes.GET_SEARCH_SUCCESS,
    payload,
})

export const getSearchFailure = (error: object) => ({
    type: postActionTypes.GET_SEARCH_FAILURE,
    error,
})

export const setSelectedUser = (payload: string) => ({
    type: postActionTypes.SET_SELECTED_USER,
    payload,
})

export const setMentionedUser = () => ({
    type: postActionTypes.SET_MENTIONED_USER,
})
