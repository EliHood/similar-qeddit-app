import { connect } from "react-redux";
import {createStructuredSelector} from "reselect";
import {
  createPostInit,
  deletePostInit,
  dislikePostInit,
  getPostsInit,
  likePostInit,
  postCommentInit,
} from "../actions/postActions";
import Dashboard from "../components/dashboard/dashboard";
import {getPopPosts, getPosts, getUser} from "./../selectors/selectors";
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  postCommentInit: (commentData: object) => dispatch(postCommentInit(commentData)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  deletePostInit: (id: number) => dispatch(deletePostInit(id)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData)),
});

const mapStateToProps = createStructuredSelector({
  posts: getPosts(),
  popPosts: getPopPosts(),
  user: getUser(),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
