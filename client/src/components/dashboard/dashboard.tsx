import React, { Component, Fragment } from "react";
import { sessionData } from "../../utils";
import CreatePost from "../forms/createPost/createPost";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
export interface dashboardProps {
  getPostsInit: () => void;
  posts: any[];
  createPostInit: (event: object) => void;
  likePost: (event: number) => void;
  dislikePost: (event: number) => void;
}
export interface dashboardState {
  title: string;
  postContent: string;
}
class Dashboard extends Component<dashboardProps, dashboardState> {
  state: dashboardState = {
    title: "",
    postContent: "",
  };
  componentDidMount() {
    this.props.getPostsInit();
  }
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as any);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const { title, postContent } = this.state;
    const postData = { title, postContent };
    this.props.createPostInit(postData);
    this.setState({
      title: "",
      postContent: "",
    });
  }
  render() {
    return (
      <Fragment>
        <CreatePost
          title={this.state.title}
          postContent={this.state.postContent}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        />
        <br />
        <PostList
          likePost={this.props.likePost}
          dislikePost={this.props.dislikePost}
          posts={this.props.posts}
          currentUser={sessionData.getCurrentUser()}
        />
      </Fragment>
    );
  }
}

export default GridHoc(Dashboard);
