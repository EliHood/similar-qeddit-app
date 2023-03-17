/* eslint-disable no-alert */
import Pusher from 'pusher-js'
import { toast } from 'react-toastify'
import { eventChannel } from 'redux-saga'
import { call, fork, put, take, takeLatest } from 'redux-saga/effects'
import * as actionTypes from '../actions/postActions'
import * as types from '../actionTypes/postActionTypes'
import api from '../api/api'

type commentType = {
    body: string
    userId: number
    currentUser: number
    commenterId: number
}

function createEventChannel(pusher: Pusher) {
    return eventChannel((emitter) => {
        const channel = pusher.subscribe('notification')
        channel.bind('my-event', (data: commentType) => {
            // we need an emitter for notificationSuccess method to work
            emitter(data.body)

            toast.success(data.body)
        })
        channel.bind('user-mention', (data: string) => {
            // we need an emitter for notificationSuccess method to work
            emitter(data)
            toast.info(data)
        })

        return () => {
            channel.unbind('my-event', emitter)
            channel.unbind('user-mention', emitter)
        }
    })
}

function createCommentChannel(pusher: Pusher) {
    return eventChannel((emitter) => {
        const channel = pusher.subscribe('post-comments')
        channel.bind('new-comment', (data: string) => {
            // we need an emitter for notificationSuccess method to work
            emitter(data)
        })

        return () => {
            channel.unbind('new-comment', emitter)
        }
    })
}

export function* commentUpdates() {
    try {
        const pusherClient = new Pusher('0d45d56558d5bdcbc179', {
            cluster: 'us2',
            forceTLS: true,
        })
        const channel = yield call(createCommentChannel, pusherClient)

        while (true) {
            const data = yield take(channel)
            yield put(actionTypes.commentUpdatesSuccess(data))
        }
    } catch (err) {
        yield put(actionTypes.commentUpdatesFailure(err))
    }
}

export function* getNotification() {
    try {
        const pusherClient = new Pusher('0d45d56558d5bdcbc179', {
            cluster: 'us2',
            forceTLS: true,
        })
        const channel = yield call(createEventChannel, pusherClient)

        while (true) {
            const data = yield take(channel)
            yield put(actionTypes.notificationSuccess(data))
        }
    } catch (err) {
        yield put(actionTypes.notificationFailure(err))
    }
}

export function* getPosts() {
    try {
        const posts = yield call(api.post.getPosts) // call api from axios express back end
        console.log('posts', posts)
        if (typeof posts === 'string') {
            return
        }
        yield put(actionTypes.getPostsSuccess(posts))
    } catch (error) {
        yield put(actionTypes.getPostsFailure(error))
    }
}

export function* fetchPost(action) {
    try {
        const postPage = yield call(api.post.getPost, action.payload)
        yield put(actionTypes.fetchPostSuccess(postPage))
    } catch (error) {
        yield put(actionTypes.fetchPostFailure(error))
    }
}
export function* createPost(action) {
    try {
        const post = yield call(api.post.createPost, action.payload)
        yield put(actionTypes.createPostSuccess(post))
    } catch (error) {
        yield put(
            actionTypes.createPostFailure(error.response.data.meta.message)
        )
    }
}

export function* editComment(action) {
    try {
        const data = action.payload
        const comment = yield call(
            api.post.editComment,
            action.payload.id,
            action.payload.userId,
            { commentData: action.payload.comment_body }
        )
        yield put(actionTypes.editCommentSuccess({ comment, data }))
    } catch (err) {
        yield put(actionTypes.editCommentFailure(err))
    }
}

export function* likePost(action) {
    try {
        const like = yield call(api.post.likePost, action.payload)
        const id = action.payload
        yield put(actionTypes.likePostSuccess({ like, id }))
    } catch (error) {
        yield put(actionTypes.likePostFailiure(error.response.data))
    }
}
export function* dislikePost(action) {
    try {
        const dislike = yield call(api.post.dislikePost, action.payload)
        const id = action.payload
        yield put(actionTypes.dislikePostSuccess({ dislike, id }))
    } catch (error) {
        yield put(actionTypes.dislikePostFailiure(error.response.data))
    }
}

export function* deletePost(action) {
    // eslint-disable-next-line no-alert
    const deleteConfirmation = window.confirm(
        'Are you sure you want to delete your post ?'
    )

    if (deleteConfirmation) {
        try {
            const deletePostCall = yield call(
                api.post.deletePost,
                action.payload,
                action.userId
            )
            yield put(
                actionTypes.deletePostSuccess(deletePostCall, action.payload)
            )
        } catch (error) {
            yield put(actionTypes.dislikePostFailiure(error))
        }
    } else {
        return null
    }
}

export function* postComment(action) {
    try {
        const data = yield call(api.post.postComment, action.payload)
        yield put(
            actionTypes.postCommentSuccess(data.comment, action.payload.id)
        )
    } catch (error) {
        yield put(actionTypes.postCommentFailure(error.response.data))
    }
}

export function* deleteComment(action) {
    const deleteConfirmation = window.confirm(
        'Are you sure you want to delete your comment ?'
    )
    if (deleteConfirmation) {
        try {
            const deleteCommentCall = yield call(
                api.post.deleteComment,
                action.payload,
                action.userId
            )
            yield put(
                actionTypes.deleteCommentSuccess(
                    deleteCommentCall,
                    action.payload,
                    action.postId
                )
            )
        } catch (error) {
            yield put(actionTypes.deleteCommentFailure(error))
        }
    } else {
        return null
    }
}

export function* repostPost(action) {
    try {
        const userId = action.payload
        const postId = action.id
        const repost = yield call(api.post.repost, userId, postId)
        yield put(actionTypes.repostPostSuccess(repost))
    } catch (err) {
        yield put(actionTypes.repostPostFailure(err))
    }
}
export function* unRepostPost(action) {
    try {
        const userId = action.payload
        const postId = action.id
        const repost = yield call(api.post.unrepost, userId, postId)

        yield put(actionTypes.unrepostPostSuccess(repost))
    } catch (err) {
        yield put(actionTypes.unrepostPostFailure(err))
    }
}

export function* replyComment(action) {
    try {
        const { postId } = action.payload
        const { commentId } = action.payload
        const { replyBody } = action.payload
        const replyCommentCall = yield call(
            api.post.replyComment,
            postId,
            commentId,
            { replyBody }
        )
        yield put(actionTypes.commentReplySuccess(replyCommentCall))
    } catch (err) {
        yield put(actionTypes.commentReplyFailure(err))
    }
}

export function* deleteReply(action) {
    const deleteConfirmation = window.confirm(
        'Are you sure you want to delete your reply ?'
    )

    if (deleteConfirmation) {
        try {
            const { postId } = action.payload
            const { replyId } = action.payload
            const { userId } = action.payload
            const deleteReplyCall = yield call(
                api.post.deleteReply,
                postId,
                replyId,
                userId
            )
            const data = {
                deleteReplyCall,
                action,
            }
            yield put(actionTypes.deleteReplySuccess(data))
        } catch (err) {
            yield put(actionTypes.deleteReplyFailure(err))
        }
    } else {
        return null
    }
}

export function* searchPosts(action) {
    try {
        if (action.payload === '') {
            const search = yield call(api.post.searchPostsNull, action.payload)
            yield put(actionTypes.searchPostsSuccess(search))
        } else {
            const search = yield call(api.post.searchPosts, action.payload)
            yield put(actionTypes.searchPostsSuccess(search))
        }
    } catch (err) {
        yield put(actionTypes.searchPostsFailure(err))
    }
}

export function* searchPageResults(action) {
    const query = action.payload

    try {
        const search = yield call(api.post.searchPosts, query)
        yield put(actionTypes.getSearchSuccess(search))
    } catch (err) {
        yield put(actionTypes.getSearchFailure(err))
    }
}

export function* watchSearchPosts() {
    yield takeLatest(types.SEARCH_POSTS_INIT, searchPosts)
}
export function* watchSearchPageResults() {
    yield takeLatest(types.GET_SEARCH_INIT, searchPageResults)
}
export function* watchDeleteReply() {
    yield takeLatest(types.REPLY_DELETE_INIT, deleteReply)
}

export function* watchFetchPost() {
    yield takeLatest(types.FETCH_POST_INIT, fetchPost)
}
export function* watchReplyComment() {
    yield takeLatest(types.COMMENT_REPLY_INIT, replyComment)
}
// dont use a watcher for notifications, it will keep calling itself
// export function* watchNotifications() {
//   yield takeEvery(types.INIT_NOTIFICATION, getNotification)
// }
export function* watchRepostPost() {
    yield takeLatest(types.REPOST_POST_INIT, repostPost)
}
export function* watchUnRepostPost() {
    yield takeLatest(types.UNREPOST_POST_INIT, unRepostPost)
}
export function* watchEditComment() {
    yield takeLatest(types.EDIT_COMMENT_INIT, editComment)
}

export function* watchDeletePost() {
    yield takeLatest(types.DELETE_POST_INIT, deletePost)
}
export function* watchDeleteComment() {
    yield takeLatest(types.DELETE_COMMENT_INIT, deleteComment)
}
export function* watchLikePost() {
    yield takeLatest(types.LIKE_POST_INIT, likePost)
}
export function* watchdisLikePost() {
    yield takeLatest(types.DISLIKE_POST_INIT, dislikePost)
}
export function* watchPostComment() {
    yield takeLatest(types.POST_COMMENT_INIT, postComment)
}
export function* watchPosts() {
    yield takeLatest(types.GET_POSTS_INIT, getPosts)
}
export function* watchCreatePost() {
    yield takeLatest(types.CREATE_POST_INIT, createPost)
}

// export function*
export default function* () {
    yield fork(watchPosts)
    yield fork(watchSearchPageResults)
    yield fork(watchReplyComment)
    yield fork(watchDeleteReply)
    yield fork(commentUpdates)
    yield fork(watchRepostPost)
    yield fork(getNotification)
    yield fork(watchUnRepostPost)
    yield fork(watchPostComment)
    yield fork(watchDeletePost)
    yield fork(watchFetchPost)
    yield fork(watchDeleteComment)
    yield fork(watchCreatePost)
    yield fork(watchLikePost)
    yield fork(watchEditComment)
    yield fork(watchdisLikePost)
    yield fork(watchSearchPosts)
}
