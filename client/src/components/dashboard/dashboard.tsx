import React, { Component, Fragment } from "react";
import GridHoc from "../hoc/grid";
import PostList from "../forms/postList/postList";
import CreatePost from "../forms/createPost/createPost";
export interface dashboardProps {
  getPostsInit: () => void;
  posts: Array<any>;
  createPostInit: (event: object) => void;
}
export interface dashboardState {
  title: string;
  postContent: string;
}
class Dashboard extends Component<dashboardProps, dashboardState> {
  state: dashboardState = {
    title: "",
    postContent: ""
  };
  componentDidMount() {
    this.props.getPostsInit();
  }
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    } as any);
  };

  onSubmit = (e: any) => {
    e.preventDefault();
    const { title, postContent } = this.state;
    const postData = { title, postContent };
    console.log(postData);
    this.props.createPostInit(postData);
  };
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <CreatePost
          title={this.state.title}
          postContent={this.state.postContent}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        />
        <br />
        <PostList posts={this.props.posts} />
      </Fragment>
    );
  }
}

export default GridHoc(Dashboard);
