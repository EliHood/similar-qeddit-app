import React, { Component, Fragment } from "react";
import CreatePost from "../forms/createPost/createPost";
import PostList from "../forms/postList/postList";
import GridHoc from "../hoc/grid";
import OurTabs from '../forms/tabs/OurTabs'
export interface dashboardProps {
  getPostsInit: () => void;
  getPopPostsInit: () => void;
  deletePostInit: (id: number) => void;
  posts: any[];
  popPosts: any[];
  createPostInit: (event: object) => void;
  likePost: (event: number) => void;
  dislikePost: (event: number) => void;
}
export interface dashboardState {
  title: string;
  postContent: string;
  value: number
}
class Dashboard extends Component<dashboardProps, dashboardState> {
  state: dashboardState = {
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
  
  handleTabChange = (newValue) => {
    this.setState({
      value: newValue
    } as any)
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
        {/* pass props redux props to tabs */}
        <OurTabs {...this.props}/>
      </Fragment>
    );
  }
}

export default GridHoc(Dashboard);
