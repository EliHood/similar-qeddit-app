import React, { Fragment, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { toast, ToastContainer } from "react-toastify";
import OurLink from "../../../common/OurLink";
import RepeatIcon from "@material-ui/icons/Repeat";
import "react-toastify/dist/ReactToastify.css";
import storeHooks from "../../../common/storeHooks";
import OurDate from "../../../common/Date";
import AuthButtons from "../../../common/AuthButtons";
import CommentBottom from "../commentbottom/commentBottom";

function PostItemContainer(props: any) {
    const [openModal, setOpenModal] = useState(false);
    const { rePost, unRepost, commenterId } = storeHooks();
    const handleClickOpen = React.useCallback(() => {
        setOpenModal(true);
    }, [setOpenModal]);
    const handleCloseModal = React.useCallback(() => {
        setOpenModal(false);
    }, [setOpenModal]);
    const { post, currentUser, getNotifications } = props;
    // check if user is on user posts,
    const ifOnPosts = window.location.href.indexOf("posts") != -1;
    return (
        <Fragment>
            {/* do not show notification dialong if commenter comments on a post, only show comment notification if someelse commented on a post
             do not need to see notification for your own comments
             */}
            {getNotifications && currentUser && currentUser.user && currentUser.user.id !== commenterId && <ToastContainer autoClose={4000} position={toast.POSITION.BOTTOM_RIGHT} />}
            <Grid data-testid="post-item-container" item={true} sm={12} md={12} style={{ margin: "20px 0px" }}>
                <Paper style={{ padding: "20px" }}>
                    {ifOnPosts ? (
                        <Fragment>
                            {post.RepostedByMe && currentUser && currentUser.user && post.userId !== currentUser.user.id ? (
                                <Fragment>
                                    <Typography>
                                        <RepeatIcon style={{ margin: "-5px 0px", color: "green" }} /> Repost from {post.author.username}
                                    </Typography>
                                </Fragment>
                            ) : null}
                        </Fragment>
                    ) : null}

                    <Typography variant="h5" align="left">
                        <OurLink
                            style={{ fontSize: "16px" }}
                            to={{
                                pathname: `/post/${post.id}`,
                                state: { post },
                            }}
                            title={post.title}
                        />
                    </Typography>
                    <Grid item={true} sm={12} md={12} style={{ padding: "30px 0px" }}>
                        <Typography data-testid="post-content-testid" align="left">
                            {post.postContent.slice(0, 50)}
                        </Typography>
                    </Grid>
                    <Avatar
                        style={{
                            display: "inline-block",
                            margin: "-10px -20px",
                            padding: "0px 30px 0px 20px",
                        }}
                        sizes="small"
                        src={post.author.gravatar}
                    />
                    <Typography display="inline" variant="subtitle1" align="left">
                        <OurLink
                            to={{
                                pathname: `/profile/${post.author.username}`,
                                state: { post },
                            }}
                            title={post.author.username}
                        />
                    </Typography>
                    {/* <Typography align="right" variant="body1">
                        Likes: {post.likeCounts}
                    </Typography> */}
                    <Grid container={true} spacing={1} style={{ padding: "20px 0px" }}>
                        <Grid item={true} sm={10} lg={10} md={10} style={{ padding: "0px 0px" }}>
                            <Typography align="left">
                                {currentUser && currentUser.user && post.userId === currentUser.user.id ? (
                                    <span style={{ cursor: "pointer" }} onClick={() => props.deletePost(post.id, post.userId)}>
                                        <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                                    </span>
                                ) : null}
                            </Typography>
                            <Typography align="left">
                                {currentUser && currentUser.user && post.userId !== currentUser.user.id ? (
                                    <Fragment>
                                        {post.RepostedByMe ? (
                                            <Fragment>
                                                <span style={{ cursor: "pointer" }} onClick={() => unRepost(post.id, currentUser.user.id)}>
                                                    <RepeatIcon style={{ margin: "-5px 0px", color: "green" }} /> <span>Un-Repost</span>
                                                </span>
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <span style={{ cursor: "pointer" }} onClick={() => rePost(post.id, currentUser.user.id)}>
                                                    <RepeatIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Repost</span>
                                                </span>
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ) : null}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={2} lg={2} style={{ padding: "0px 15px" }}>
                            <Typography align="right">
                                <AuthButtons currentUser={currentUser} type="post-buttons" handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} post={post} openModal={openModal} />
                            </Typography>
                        </Grid>
                    </Grid>

                    <OurDate type="post-date" createdAt={post.createdAt} />
                    <CommentBottom post={post} deleteComment={props.deleteComment} currentUser={props.currentUser} postComment={props.postComment} />
                </Paper>
            </Grid>
        </Fragment>
    );
}
export default PostItemContainer;
