import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addContent,
    addTitle,
    createPostInit,
    deleteCommentInit,
    initCommentUpdates,
    deletePostInit,
    dislikePostInit,
    getPostsInit,
    likePostInit,
    notificationInit,
    postCommentInit,
} from "../../actions/postActions";
import { getBodyError, getIsNotified, getNotification, getPopPosts, getPosts, getTitleError, getUser, postContent, title } from "./../../selectors/selectors";
function usePostsHooks() {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts());
    React.useEffect(() => {
        dispatch(getPostsInit());
        dispatch(initCommentUpdates());
    }, []);
    return [posts];
}

export default usePostsHooks;
