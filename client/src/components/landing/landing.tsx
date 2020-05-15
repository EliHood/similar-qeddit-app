import React, { Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";
import usePostsHook from "./../../common/postsHook";
import storeMethods from "./../../common/storeHooks";
function Landing() {
    // calls the posts api once, then we use storeMethods().posts to get the posts from store
    usePostsHook();

    return (
        <Fragment>
            <Typography variant="h6" align="left">
                Post's from our users
            </Typography>
            <PostList
                likePost={storeMethods().likePost}
                deletePost={storeMethods().deletePost}
                deleteComment={storeMethods().deleteComment}
                dislikePost={storeMethods().dislikePost}
                posts={storeMethods().posts}
                currentUser={storeMethods().user}
                postComment={storeMethods().postComment}
                isNotified={storeMethods().isNotified}
                getNotifications={storeMethods().notifications}
                editComment={storeMethods().editComment}
            />
        </Fragment>
    );
}
export default React.memo(GridHoc(Landing));
