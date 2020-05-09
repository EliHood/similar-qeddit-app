import React, { Fragment, useRef, Component } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";
import usePostsHook from "./../common/postsHook";
function Landing(props) {
    const [posts] = usePostsHook();
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

    return (
        <Fragment>
            <Typography variant="h6" align="left">
                Post's from our users
            </Typography>
            <PostList
                likePost={props.likePost}
                deletePost={props.deletePostInit}
                deleteComment={props.deleteComment}
                dislikePost={props.dislikePost}
                posts={posts}
                currentUser={props.user}
                postComment={props.postCommentInit}
                isNotified={props.isNotified}
                getNotifications={props.notificationInit}
                notification={props.notification}
                editComment={props.editCommentInit}
            />
        </Fragment>
    );
}
export default GridHoc(Landing);
