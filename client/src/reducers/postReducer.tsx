import produce from "immer";
import * as types from "../actionTypes/postActionTypes";
import { validation } from "../utils";
import { unRepostPost } from "../sagas/post";
export interface postState {
    posts: any[];
    postPage: any;
    error: any;
    titleError: any;
    bodyError: any;
    title: string;
    postContent: string;
    isNotified: boolean;
    notification: string;
    isLoading: Boolean;
}

const initialState: postState = {
    posts: [],
    postPage: {},
    isLoading: false,
    titleError: null,
    bodyError: null,
    title: "",
    postContent: "",
    error: null,
    isNotified: false,
    notification: "",
};

const postReducer = (state = initialState, action: any): postState =>
    produce(state, (draft) => {
        switch (action.type) {
            case types.GET_POSTS_INIT:
                draft.isLoading = true;
                return;
            case types.GET_POSTS_SUCCESS:
                console.log(action);
                draft.isLoading = false;
                draft.posts = action.payload;
                return;
            case types.GET_POSTS_FAILURE:
                console.log(action);
                draft.isLoading = false;
                draft.error = action.error;
                return;
            case types.CREATE_POST_SUCCESS:
                console.log(action.payload);
                draft.posts = [action.payload.post, ...draft.posts];
                draft.title = "";
                draft.postContent = "";
                return;
            case types.LIKE_POST_SUCCESS:
                console.log("fsfsfssfsf", action);
                const findKey = state.posts.findIndex((x) => x.id === action.payload.id);
                draft.posts[findKey].likeCounts = draft.posts[findKey].likeCounts + 1;
                draft.posts[findKey].likedByMe = true;
                draft.error = null;
                // draft.posts[findKey] = [...(draft.posts[findKey].likeCounts + 1)];
                return;
            case types.LIKE_POST_FAILURE:
                console.log("testing", action);
                draft.error = action.error.message;
                return;
            case types.FETCH_POST_SUCCESS:
                console.log(action);
                draft.postPage = action.payload;
                return;
            case types.FETCH_POST_FAILURE:
                console.log(action);
                draft.error = action.error;
                return;
            case types.DISLIKE_POST_SUCCESS:
                console.log(action);
                const newfindKey = state.posts.findIndex((x) => x.id === action.payload.id);
                draft.posts[newfindKey].likeCounts = draft.posts[newfindKey].likeCounts - 1;
                draft.posts[newfindKey].likedByMe = false;
                draft.error = null;
                return;
            case types.DELETE_POST_SUCCESS:
                console.log(action);
                draft.posts = [...draft.posts.filter((item) => item.id !== action.id)];
                return;

            case types.DISLIKE_POST_FAILURE:
                console.log("test", action);
                draft.error = action.error.message;
                return;
            // Post comment will not be appending comment to the array state, comment update
            // success will because comments will be real time
            case types.POST_COMMENT_SUCCESS:
                console.log(action);
                return;
            case types.POST_COMMENT_FAILURE:
                draft.error = action.error;
                return;
            case types.DISLIKE_POST_FAILURE:
                console.log(action);
                draft.error = action.error;
                return;
            case types.ADD_TITLE:
                draft.title = action.data;
                draft.titleError = validation.validateString(action.data);
                return;
            case types.ADD_CONTENT:
                draft.postContent = action.data;
                draft.bodyError = validation.validateContent(action.data);
                return;
            case types.EDIT_COMMENT_SUCCESS:
                console.log(action);
                const postKey = state.posts.findIndex((x) => x.id === action.payload.data.postId);
                const commentKey = draft.posts[postKey].Comments.findIndex((x) => x.id === action.payload.data.id);
                draft.posts[postKey].Comments[commentKey].comment_body = action.payload.data.comment_body;
                draft.posts[postKey].Comments = [
                    // add comment first, then sort it out by the most recent comment
                    ...draft.posts[postKey].Comments.sort((a, b) => {
                        const date1 = new Date(a.createdAt) as any;
                        const date2 = new Date(b.createdAt) as any;
                        return date1 - date2;
                    }),
                ];
                return;
            case types.EDIT_COMMENT_FAILURE:
                console.log(action);
                draft.error = action.data;
                return;
            case types.DELETE_COMMENT_SUCCESS:
                const newPostKey = state.posts.findIndex((x) => x.id === action.postId);
                draft.posts[newPostKey].Comments = [...draft.posts[newPostKey].Comments.filter((item) => item.id !== action.id)];
                // draft.posts = draft.posts[newPostKey].Comments.filter((item) => item.id !== action.id);
                return;
            case types.DELETE_COMMENT_FAILURE:
                draft.error = action.error;
                return;
            case types.NOTIFICATION_SUCCESS:
                console.log(action);
                draft.notification = action.payload;
                return;
            case types.NOTIFICATION_FAILURE:
                console.log(action);
                draft.error = action.error;
                return;
            case types.COMMENT_UPDATES_SUCCESS:
                console.log(action);
                const findCommentKey2 = state.posts.findIndex((x) => x.id === action.payload.comment.postId);
                console.log(findCommentKey2);
                draft.posts[findCommentKey2].Comments = [
                    action.payload.comment,
                    // add comment first, then sort it out by the most recent comment
                    ...draft.posts[findCommentKey2].Comments.sort((a, b) => {
                        const date1 = new Date(a.createdAt) as any;
                        const date2 = new Date(b.createdAt) as any;
                        return date2 - date1;
                    }),
                ];
                return;
            case types.COMMENT_UPDATES_FAILURE:
                console.log(action);
                return;
            case types.REPOST_POST_SUCCESS:
                console.log(action);
                const postId = action.payload.post.postId;
                const repostPostKey = state.posts.findIndex((x) => x.id === postId);
                console.log("checking repost post Key", repostPostKey);
                draft.posts[repostPostKey].RepostedByMe = true;
                return;
            case types.REPOST_POST_FAILURE:
                console.log(action);
                return;
            case types.UNREPOST_POST_SUCCESS:
                console.log(action);
                const unRepostId = action.payload.postId;
                const unrepostPostKey = state.posts.findIndex((x) => x.id === unRepostId);
                console.log("checking repost post Key", unrepostPostKey);
                draft.posts[unrepostPostKey].RepostedByMe = false;
                return;
            case types.UNREPOST_POST_FAILURE:
                console.log(action);
                return;
        }
    });

export default postReducer;
