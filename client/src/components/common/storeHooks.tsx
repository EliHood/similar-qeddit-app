import usePostsHook from "./postsHook";
import useNotificationHook from "./notificationHook";
import { useDispatch, useSelector } from "react-redux";
import { likePostInit, dislikePostInit, deletePostInit, createPostInit, addTitle, addContent, deleteCommentInit, editCommentInit, postCommentInit } from "../../actions/postActions";
import { getIsNotified, getUser, getPosts, getPopPosts, getBodyError, getTitleError, postContent, title } from "../../selectors/selectors";
function useStoreMethods() {
    const dispatch = useDispatch();
    const [notifications] = useNotificationHook();
    const isNotified = useSelector(getIsNotified());
    const user = useSelector(getUser());
    const likePost = (id: number) => dispatch(likePostInit(id));
    const dislikePost = (id: number) => dispatch(dislikePostInit(id));
    const deletePost = (id: number, userId: number) => dispatch(deletePostInit(id, userId));
    const deleteComment = (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId));
    const postComment = (commentData: object) => dispatch(postCommentInit(commentData));
    const editComment = (commentData) => dispatch(editCommentInit(commentData));
    const createPost = (postData: object) => dispatch(createPostInit(postData));
    const ourTitle = useSelector(title());
    const titleError = useSelector(getTitleError());
    const ourBodyError = useSelector(getBodyError());
    const ourPostContent = useSelector(postContent());
    const popPosts = useSelector(getPopPosts());
    const posts = useSelector(getPosts());
    return {
        posts,
        notifications,
        user,
        isNotified,
        likePost,
        dislikePost,
        deletePost,
        deleteComment,
        postComment,
        editComment,
        createPost,
        ourTitle,
        titleError,
        popPosts,
        ourBodyError,
        ourPostContent,
    };
}

export default useStoreMethods;
