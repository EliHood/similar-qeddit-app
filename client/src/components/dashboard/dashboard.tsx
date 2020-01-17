import React, { Component, Fragment } from "react";
import CreatePost from "../forms/createPost/createPost";
import PostList from "../forms/postList/postList";
import OurTabs from "../forms/tabs/OurTabs";
import GridHoc from "../hoc/grid";
export interface dashboardProps {
  getPostsInit: () => void;
  getPopPostsInit: () => void;
  deletePostInit: (id: number) => void;
  postCommentInit: (event: object) => void;
  posts: any[];
  popPosts: any[];
  createPostInit: (event: object) => void;
  likePost: (event: number) => void;
  dislikePost: (event: number) => void;
}
export interface dashboardState {
  title: string;
  postContent: string;
  value: number;
}
class Dashboard extends Component<dashboardProps, dashboardState> {
  public state: dashboardState = {
    title: "",
    postContent: "",
    value: 0,
  };
  public componentDidMount() {
    this.props.getPostsInit();
  }
  public handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as any);
  }

  public handleTabChange = (newValue) => {
    this.setState({
      value: newValue,
    } as any);
  }

  public onSubmit = (e: any) => {
    e.preventDefault();
    const { title, postContent } = this.state;
    const postData = { title, postContent };
    this.props.createPostInit(postData);
    this.setState({
      title: "",
      postContent: "",
    });
  }
  public render() {
    return (
      <Fragment>
        <CreatePost
          title={this.state.title}
          postContent={this.state.postContent}
          handleChange={this.handleChange}
          onSubmit={this.onSubmit}
        />
        <br />
        {/* pass props redux props to tabs */}
        <OurTabs {...this.props}/>
      </Fragment>
    );
  }
}

export default GridHoc(Dashboard);
