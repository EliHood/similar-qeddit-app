import React, { Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";
import usePostsHook from "./../../common/postsHook";
import storeMethods from "./../../common/storeHooks";
import OurError from "../../common/OurError";
import OurWrapper from "../../common/OurWrapper";
import Grid from "@material-ui/core/Grid";
function Landing(props: any) {
    // calls the posts api once, then we use storeMethods().posts to get the posts from store
    usePostsHook();
    // const classes = styles();
    const { postResults } = storeMethods();
    return (
        <Fragment>
            <OurWrapper appBar={props.appBar} appOpen={props.appOpen} appBarShift={props.appBarShift}>
                <Typography variant="subtitle1" align="left">
                    Post's from our users
                </Typography>

                {storeMethods().errPost && <OurError />}
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
            </OurWrapper>
        </Fragment>
    );
}
export default React.memo(GridHoc(Landing));

export { Landing as LandingComponent };
