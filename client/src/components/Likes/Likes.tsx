import React, { Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import usePostsHook from "./../../common/postsHook";
import OurWrapper from "../../common/OurWrapper";
export interface IProps {
    match?: any;
    user?: any;
    getPostsInit: () => void;
    deletePostInit: (id: number, userId: number) => void;
    deleteComment: (id: number, postId: number, userId: number) => void;
    postCommentInit: (event: object) => void;
    titleError?: boolean;
    bodyError?: boolean;
    posts: any[];
    error: any[];
    title: string;
    postContent: string;
    addTitle: (data: string) => void;
    addContent: (data: string) => void;
    createPostInit: (event: object) => void;
    likePost: (event: number) => void;
    dislikePost: (event: number) => void;
    isNotified?: boolean;
    notificationInit: () => void;
    notification: string;
    appBar: any;
    appBarShift: any;
    appOpen: Boolean;
}
function Likes(props: IProps) {
    usePostsHook();
    return (
        <Fragment>
            {/* <Grid container={true}>
                <Grid item={true} lg={9} xs={12}> */}
            <OurWrapper appBar={props.appBar} appOpen={props.appOpen} appBarShift={props.appBarShift}>
                <PostList
                    likePost={props.likePost}
                    deletePost={props.deletePostInit}
                    deleteComment={props.deleteComment}
                    dislikePost={props.dislikePost}
                    posts={props.posts}
                    currentUser={props.user}
                    postComment={props.postCommentInit}
                    isNotified={props.isNotified}
                    getNotifications={props.notificationInit}
                    notification={props.notification}
                />
                {/* </Grid>
            </Grid> */}
            </OurWrapper>
        </Fragment>
    );
}

export default GridHoc(React.memo(Likes));
export { Likes as LikesComponent };
