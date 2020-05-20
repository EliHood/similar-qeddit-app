import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initCommentUpdates, getPostsInit } from "../actions/postActions";
import { getPosts } from "../selectors/selectors";
function usePostsHooks() {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts());
    React.useEffect(() => {
        dispatch(getPostsInit());
        dispatch(initCommentUpdates());
    }, []);
    return { posts };
}

export default usePostsHooks;
