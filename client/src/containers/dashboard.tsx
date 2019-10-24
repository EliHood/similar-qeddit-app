import { connect } from "react-redux";
import Dashboard from "../components/dashboard/dashboard";
import { getPostsInit, createPostInit } from "../actions/postActions";
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  createPostInit: (postData: object) => dispatch(createPostInit(postData))
});

const mapStateToProps = (state: any) => ({
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
