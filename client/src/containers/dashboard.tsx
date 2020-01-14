import { connect } from "react-redux";
import {
  createPostInit,
  dislikePostInit,
  getPostsInit,
  likePostInit,
} from "../actions/postActions";
import Dashboard from "../components/dashboard/dashboard";
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData)),
});

const mapStateToProps = (state: any) => ({
  posts: state.post.posts,
  popPosts: state.post.popPosts,
  user: state.user.currentUserId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
