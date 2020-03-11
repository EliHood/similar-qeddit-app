import React, { Component, Fragment } from "react";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import usePostsHook from "./../common/postsHook";
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
}
function Likes(props: IProps) {
    usePostsHook();
    console.log(props.posts); // this needs to be passed to container
    console.log("test");
    return (
        <Fragment>
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
        </Fragment>
    );
}

export default GridHoc(React.memo(Likes));
export { Likes as LikesComponent };
