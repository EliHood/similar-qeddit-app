import produce from 'immer'
import * as types from '../actionTypes/postActionTypes'
import validation from '../utils/validation'
import { IPostState } from '../types'

const initialState: IPostState = {
    posts: [],
    postPage: {},
    isLoading: false,
    titleError: null,
    bodyError: null,
    title: '',
    postContent: '',
    error: null,
    isNotified: false,
    notification: '',
    searchValue: '',
    results: [],
    searchPageResults: [],
    selectedUser: '',
    mentionedUser: false,
    commenterId: null,
}

const postReducer = (state = initialState, action: any): IPostState =>
    produce(state, (draft) => {
        console.log('state', state)
        switch (action.type) {
            case types.GET_POSTS_INIT:
                draft.isLoading = true
                return
            case types.GET_POSTS_SUCCESS:
                draft.isLoading = false
                draft.posts = action.payload

                return
            case types.GET_POSTS_FAILURE:
                draft.isLoading = false
                draft.error = action.error

                return
            case types.CREATE_POST_SUCCESS:
                draft.posts = [action.payload.post, ...draft.posts]
                draft.title = ''
                draft.postContent = ''

                return
            case types.LIKE_POST_SUCCESS:
                const findKey = state.posts.findIndex(
                    (x) => x.id === action.payload.id
                )

                draft.posts[findKey].likeCounts =
                    draft.posts[findKey].likeCounts + 1
                draft.posts[findKey].likedByMe = true
                draft.error = null

                // draft.posts[findKey] = [...(draft.posts[findKey].likeCounts + 1)];
                return
            case types.LIKE_POST_FAILURE:
                draft.error = action.error.message
                return
            case types.FETCH_POST_SUCCESS:
                draft.postPage = action.payload
                return
            case types.FETCH_POST_FAILURE:
                draft.error = action.error
                return
            case types.DISLIKE_POST_SUCCESS:
                const newfindKey = state.posts.findIndex(
                    (x) => x.id === action.payload.id
                )
                draft.posts[newfindKey].likeCounts =
                    draft.posts[newfindKey].likeCounts - 1
                draft.posts[newfindKey].likedByMe = false
                draft.error = null

                return
            case types.DELETE_POST_SUCCESS:
                draft.posts = [
                    ...draft.posts.filter((item) => item.id !== action.id),
                ]

                return

            case types.DISLIKE_POST_FAILURE:
                draft.error = action.error.message

                return
            // Post comment will not be appending comment to the array state, comment update
            // success will because comments will be real time
            case types.POST_COMMENT_SUCCESS:
                return
            case types.POST_COMMENT_FAILURE:
                draft.error = action.error
                return
            case types.ADD_TITLE:
                draft.title = action.data
                draft.titleError = validation.validateString(action.data)
                return
            case types.ADD_CONTENT:
                draft.postContent = action.data
                draft.bodyError = validation.validateContent(action.data)
                return
            case types.EDIT_COMMENT_SUCCESS:
                const postKey = state.posts.findIndex(
                    (x) => x.id === action.payload.data.postId
                )
                const commentKey = draft.posts[postKey].Comments.findIndex(
                    (x) => x.id === action.payload.data.id
                )
                draft.posts[postKey].Comments[commentKey].comment_body =
                    action.payload.data.comment_body
                draft.posts[postKey].Comments = [
                    // add comment first, then sort it out by the most recent comment
                    ...draft.posts[postKey].Comments.sort((a, b) => {
                        const date1 = new Date(a.createdAt) as any
                        const date2 = new Date(b.createdAt) as any

                        return date1 - date2
                    }),
                ]

                return
            case types.EDIT_COMMENT_FAILURE:
                draft.error = action.data
                return
            case types.DELETE_COMMENT_SUCCESS:
                const newPostKey = state.posts.findIndex(
                    (x) => x.id === action.postId
                )
                draft.posts[newPostKey].Comments = [
                    ...draft.posts[newPostKey].Comments.filter(
                        (item) => item.id !== action.id
                    ),
                ]
                // draft.posts = draft.posts[newPostKey].Comments.filter((item) => item.id !== action.id);
                return
            case types.DELETE_COMMENT_FAILURE:
                draft.error = action.error
                return
            case types.NOTIFICATION_SUCCESS:
                draft.notification = action.payload
                return
            case types.NOTIFICATION_FAILURE:
                draft.error = action.error
                return
            case types.COMMENT_UPDATES_SUCCESS:
                const findCommentKey2 = draft.posts.findIndex(
                    (x) => x.id === action.payload.comment.postId
                )
                draft.posts[findCommentKey2].Comments = [
                    action.payload.comment,
                    // add comment first, then sort it out by the most recent comment
                    ...draft.posts[findCommentKey2].Comments.sort((a, b) => {
                        const date1 = new Date(a.createdAt) as any
                        const date2 = new Date(b.createdAt) as any

                        return date2 - date1
                    }),
                ]
                draft.commenterId = action.payload.comment.userId

                return
            case types.COMMENT_UPDATES_FAILURE:
                return
            case types.REPOST_POST_SUCCESS:
                const { postId } = action.payload.post
                const repostPostKey = state.posts.findIndex(
                    (x) => x.id === postId
                )
                draft.posts[repostPostKey].RepostedByMe = true

                return
            case types.REPOST_POST_FAILURE:
                return
            case types.COMMENT_REPLY_SUCCESS:
                const replyPostId = action.payload.reply.postId
                const replyCommentId = action.payload.reply.commentId
                const postReplyIndex = state.posts.findIndex(
                    (x) => x.id === replyPostId
                )
                const commentIndex = state.posts[
                    postReplyIndex
                ].Comments.findIndex((x) => x.id === replyCommentId)
                draft.posts[postReplyIndex].Comments[
                    commentIndex
                ].commentReplies = [
                    action.payload.reply,
                    ...draft.posts[postReplyIndex].Comments[commentIndex]
                        .commentReplies,
                ]

                return
            case types.COMMENT_REPLY_FAILURE:
                return
            case types.REPLY_DELETE_SUCCESS:
                const deleteReplyPostId = action.payload.action.payload.postId
                const deleteReplyCommentId =
                    action.payload.action.payload.commentId
                const { replyId } = action.payload.action.payload
                const deleteReplyIdx = state.posts.findIndex(
                    (x) => x.id === deleteReplyPostId
                )
                const commentIdx = state.posts[
                    deleteReplyIdx
                ].Comments.findIndex((x) => x.id === deleteReplyCommentId)
                draft.posts[deleteReplyIdx].Comments[
                    commentIdx
                ].commentReplies = [
                    ...draft.posts[deleteReplyIdx].Comments[
                        commentIdx
                    ].commentReplies.filter((item) => item.id !== replyId),
                ]

                return
            case types.UNREPOST_POST_SUCCESS:
                const unRepostId = action.payload.postId
                const unrepostPostKey = state.posts.findIndex(
                    (x) => x.id === unRepostId
                )
                draft.posts[unrepostPostKey].RepostedByMe = false
                return
            case types.UNREPOST_POST_FAILURE:
                return
            case types.SEARCH_POSTS_INIT:
                draft.searchValue = action.payload
                return
            case types.SEARCH_POSTS_SUCCESS:
                draft.results = action.payload.post
                return
            case types.SEARCH_POSTS_FAILURE:
                draft.results = []
                return
            case types.GET_SEARCH_SUCCESS:
                draft.posts = action.payload.post
                return
            case types.GET_SEARCH_FAILURE:
                return
            case types.SET_SELECTED_USER:
                draft.selectedUser = action.payload
                draft.mentionedUser = false
                return
            case types.SET_MENTIONED_USER:
                draft.mentionedUser = true
                break
            default:
                return state
        }
    })

export default postReducer
