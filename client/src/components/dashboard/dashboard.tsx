import React, { Component, Fragment } from "react";
import CreatePost from "../forms/createPost/createPost";
import PostList from "../forms/postList/postList";
import OurTabs from "../tabs/OurTabs";
import GridHoc from "../hoc/grid";
export interface dashboardProps {
  getPostsInit: () => void;
  getPopPostsInit: () => void;
  deletePostInit: (id: number) => void;
  postCommentInit: (event: object) => void;
  titleError?: boolean;
  bodyError?: boolean;
  posts: any[];
  error: any[];
  title: string;
  postContent: string;
  addTitle: (data: string) => void;
  addContent: (data: string) => void;
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
  componentDidMount() {
    this.props.getPostsInit();
  }
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as any);
  }

  handleTitleChange = (e: any) => {
    e.preventDefault()
    this.props.addTitle(e.target.value)
  }

  handleContentChange = (e: any) => {
    e.preventDefault();
    this.props.addContent(e.target.value)
  }

  handleTabChange = (newValue) => {
    this.setState({
      value: newValue,
    } as any);
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    const { title, postContent } = this.props;
    const postData = { title, postContent };
    console.log(postData)
    this.props.createPostInit(postData);

  }
  render() {
    const isEnabled = this.props.titleError === true && this.props.bodyError === true ? false : true
    return (
      <Fragment>
        <CreatePost
          title={this.props.title}
          postContent={this.props.postContent}
          handleTitleChange={this.handleTitleChange}
          handleContentChange={this.handleContentChange}
          onSubmit={this.onSubmit}
          disButton={isEnabled}
          titleError={this.props.titleError}
          bodyError={this.props.bodyError}
        />
        <br />
        {/* pass props redux props to tabs */}
        <OurTabs {...this.props} />
      </Fragment>
    );
  }
}

export default GridHoc(Dashboard);
