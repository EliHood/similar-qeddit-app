import produce from "immer";
import * as types from "../actionTypes/postActionTypes";
import { validation } from '../utils';
export interface postState {
  posts: any[];
  postPage: any;
  error: any;
  titleError: any;
  bodyError: any;
  title: string
  postContent: string

}

const initialState: postState = {
  posts: [],
  postPage: {},
  titleError: null,
  bodyError: null,
  title: "",
  postContent: "",
  error: null
};

const postReducer = (state = initialState, action: any): postState =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.GET_POSTS_SUCCESS:
        draft.posts = action.payload;
        return;
      case types.CREATE_POST_SUCCESS:
        console.log(action.payload);
        draft.posts = [action.payload.post, ...draft.posts];
        return;
      case types.LIKE_POST_SUCCESS:
        console.log(action);
        const findKey = state.posts.findIndex((x) => x.id === action.payload.id);
        draft.posts[findKey].likeCounts = draft.posts[findKey].likeCounts + 1;
        draft.posts[findKey].likedByMe = true;
        // draft.posts[findKey] = [...(draft.posts[findKey].likeCounts + 1)];
        return;
      case types.LIKE_POST_FAILURE:
        console.log(action);
        draft.error = action.error;
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
        const newfindKey = state.posts.findIndex(
          (x) => x.id === action.payload.id,
        );
        draft.posts[newfindKey].likeCounts =
          draft.posts[newfindKey].likeCounts - 1;
        draft.posts[newfindKey].likedByMe = false;
        return;
      case types.DELETE_POST_SUCCESS:
        console.log(action);
        draft.posts = [...draft.posts.filter((item) => item.id !== action.id)];
        return;
      case types.DISLIKE_POST_FAILURE:
        draft.error = action.error;
        return;
      case types.POST_COMMENT_SUCCESS:
        console.log(action);
        const findCommentKey = state.posts.findIndex((x) => x.id === action.payload.postId);
        draft.posts[findCommentKey].Comments = [...draft.posts[findCommentKey].Comments, action.payload]
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
        return
      case types.ADD_CONTENT:
        draft.postContent = action.data;
        draft.bodyError = validation.validateContent(action.data);
        return
    }
  });

export default postReducer;
