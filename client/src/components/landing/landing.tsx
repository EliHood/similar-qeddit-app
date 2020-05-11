import React, { Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";
import usePostsHook from "./../common/postsHook";
import useNotificationHook from "../common/notificationHook";
import { useDispatch, useSelector } from "react-redux";
import { likePostInit, dislikePostInit, deletePostInit, deleteCommentInit, editCommentInit, postCommentInit } from "./../../actions/postActions";
import { getIsNotified, getUser } from "./../../selectors/selectors";
function Landing() {
    const dispatch = useDispatch();
    const [posts] = usePostsHook();
    const user = useSelector(getUser());
    const isNotified = useSelector(getIsNotified());
    const [notifications] = useNotificationHook();
    const likePost = (id: number) => dispatch(likePostInit(id));
    const dislikePost = (id: number) => dispatch(dislikePostInit(id));
    const deletePost = (id: number, userId: number) => dispatch(deletePostInit(id, userId));
    const deleteComment = (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId));
    const postComment = (commentData: object) => dispatch(postCommentInit(commentData));
    const editComment = (commentData) => dispatch(editCommentInit(commentData));
    // const didMountRef = useRef<Object>();
    // React.useEffect(() => {
    //     if (!didMountRef.current) {
    //         props.getPostsInit();
    //         props.initCommentUpdates();
    //         console.log("test");
    //     } else {
    //         console.log("this is component didupdate");
    //     }
    // }, []); // array prevents an infinite loop
    console.log("fsfsffsfs", user);
    return (
        <Fragment>
            <Typography variant="h6" align="left">
                Post's from our users
            </Typography>
            <PostList
                likePost={likePost}
                deletePost={deletePost}
                deleteComment={deleteComment}
                dislikePost={dislikePost}
                posts={posts}
                currentUser={user}
                postComment={postComment}
                isNotified={isNotified}
                getNotifications={notifications}
                editComment={editComment}
            />
        </Fragment>
    );
}
export default GridHoc(Landing);
