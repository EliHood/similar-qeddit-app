import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  createPostInit,
  deletePostInit,
  dislikePostInit,
  getPostsInit,
  likePostInit,
  postCommentInit,
  addTitle,
  addContent,
  deleteCommentInit
} from "../actions/postActions";
import Dashboard from "../components/dashboard/dashboard";
import { getPopPosts, getPosts, getUser, getBodyError, getTitleError, title, postContent } from "./../selectors/selectors";
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  addTitle: (data: string) => dispatch(addTitle(data)),
  addContent: (data: string) => dispatch(addContent(data)),
  postCommentInit: (commentData: object) => dispatch(postCommentInit(commentData)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  deletePostInit: (id: number, userId: number) => dispatch(deletePostInit(id, userId)),
  deleteComment: (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData)),
});

const mapStateToProps = createStructuredSelector({
  posts: getPosts(),
  popPosts: getPopPosts(),
  user: getUser(),
  titleError: getTitleError(),
  bodyError: getBodyError(),
  title: title(),
  postContent: postContent()
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
