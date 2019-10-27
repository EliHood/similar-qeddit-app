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
    }
  });

export default postReducer;
