import { connect } from "react-redux";
import {
  createPostInit,
  dislikePostInit,
  getPostsInit,
  likePostInit,
  deletePostInit,
} from "../actions/postActions";
import Dashboard from "../components/dashboard/dashboard";
import {getPosts, getPopPosts, getUser} from './../selectors/selectors';
import {createStructuredSelector} from 'reselect';
const mapDispatchToProps = (dispatch: any) => ({
  getPostsInit: () => dispatch(getPostsInit()),
  likePost: (id: number) => dispatch(likePostInit(id)),
  dislikePost: (id: number) => dispatch(dislikePostInit(id)),
  deletePostInit: (id: number) => dispatch(deletePostInit(id)),
  createPostInit: (postData: object) => dispatch(createPostInit(postData)),
});

const mapStateToProps = createStructuredSelector({
  posts: getPosts(),
  popPosts: getPopPosts(),
  user: getUser()
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
