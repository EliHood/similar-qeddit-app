import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Likes from "./../components/Likes/Likes"
import {
    deletePostInit,
    dislikePostInit,
    getPostsInit,
    likePostInit,
    postCommentInit,
    deleteCommentInit
} from "./../actions/postActions";
import { getUserPosts, getUser, getBodyError, getTitleError, title, postContent } from "./../selectors/selectors";
const mapStateToProps = (state, ownProps) => createStructuredSelector({
    posts: getUserPosts(ownProps.match.params),
    user: getUser(),
})

const mapDispatchToProps = (dispatch: any) => ({
    getPostsInit: () => dispatch(getPostsInit()),
    likePost: (id: number) => dispatch(likePostInit(id)),
    postCommentInit: (commentData: object) => dispatch(postCommentInit(commentData)),
    dislikePost: (id: number) => dispatch(dislikePostInit(id)),
    deletePostInit: (id: number, userId: number) => dispatch(deletePostInit(id, userId)),
    deleteComment: (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId)),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Likes);
