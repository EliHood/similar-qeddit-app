import produce from "immer";
import * as types from "../actionTypes/postActionTypes";

export interface postState {
  posts: Array<any>;
}

const initialState: postState = {
  posts: []
};

const postReducer = (state = initialState, action: any): postState =>
  produce(state, draft => {
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
        const findKey = state.posts.findIndex(x => x.id === action.payload.id);
        draft.posts[findKey].likeCounts = draft.posts[findKey].likeCounts + 1;
        // draft.posts[findKey] = [...(draft.posts[findKey].likeCounts + 1)];
        return;
      case types.LIKE_POST_FAILURE:
        console.log(action);
        return;
      case types.DISLIKE_POST_SUCCESS:
        console.log(action);
        const newfindKey = state.posts.findIndex(
          x => x.id === action.payload.id
        );
        draft.posts[newfindKey].likeCounts =
          draft.posts[newfindKey].likeCounts - 1;
        return;
      case types.DISLIKE_POST_FAILURE:
        console.log(action);
        return;
    }
  });

export default postReducer;
