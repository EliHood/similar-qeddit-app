import { connect } from "react-redux";
import Dashboard from "../components/dashboard/dashboard";
import {
  getPostsInit,
  createPostInit,
  dislikePostInit,
  likePostInit
} from "../actions/postActions";
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData))
});

const mapStateToProps = (state: any) => ({
  posts: state.post.posts,
  user: state.user.currentUserId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
