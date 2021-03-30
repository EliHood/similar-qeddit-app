import React, { Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import Typography from "@material-ui/core/Typography";
import usePostsHook from "../../common/usePostHook";
import storeMethods from "./../../common/storeHooks";
import OurError from "../../common/OurError";
import OurWrapper from "../../common/OurWrapper";

function Landing(props: any) {
    usePostsHook();
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
