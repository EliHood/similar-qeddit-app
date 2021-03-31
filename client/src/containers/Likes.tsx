import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
    deleteCommentInit, deletePostInit, dislikePostInit, getPostsInit, likePostInit, notificationInit, postCommentInit,
} from '../actions/postActions';
import Likes from '../components/Likes/Likes';
import { getNotification, getUser, getUserLikedPosts } from '../selectors/selectors';

const mapStateToProps = (state, ownProps) => createStructuredSelector({
    posts: getUserLikedPosts(ownProps.match.params),
    user: getUser,
    notification: getNotification,
});

const mapDispatchToProps = (dispatch: any) => ({
    notificationInit: () => dispatch(notificationInit()),
    getPostsInit: () => dispatch(getPostsInit()),
    likePost: (id: number) => dispatch(likePostInit(id)),
    postCommentInit: (commentData: object) => dispatch(postCommentInit(commentData)),
    dislikePost: (id: number) => dispatch(dislikePostInit(id)),
    deletePostInit: (id: number, userId: number) => dispatch(deletePostInit(id, userId)),
    deleteComment: (id: number, postId: number, userId: number) => dispatch(deleteCommentInit(id, postId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Likes);
