import React, { Component } from 'react';
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
export interface IProps {
    match?: any
    user?: any
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
}
class Likes extends Component<IProps, {}> {
    state = {

    }
    componentDidMount() {
        this.props.getPostsInit()
    }
    render() {
        console.log(this.props.posts) // this needs to be passed to container
        return (
            <div>
                <PostList
                    likePost={this.props.likePost}
                    deletePost={this.props.deletePostInit}
                    deleteComment={this.props.deleteComment}
                    dislikePost={this.props.dislikePost}
                    posts={this.props.posts}
                    currentUser={this.props.user}
                    postComment={this.props.postCommentInit}
                />
            </div>
        )
    }
}

export default GridHoc(Likes)
