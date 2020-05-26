import React, { Fragment, useState, useCallback, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import OurLink from "../../../common/OurLink";
import CommentForm from "../comment/CommentForm";
import CommentList from "../commentList/CommentList";
import OurModal from "../../../common/OurModal";
import "react-toastify/dist/ReactToastify.css";

function PostItemContainer(props: any) {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [comment_body, setCommentBody] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const divRef = React.useRef<any>();
    const initialRef = React.useRef<any>();
    const writeComment = () => {
        // this is the same as this.setState({ openForm: !this.state.open })
        setOpenForm(!openForm);
    };

    const commentChange = (comment) => {
        setGifUrl("");
        setCommentBody(comment);
    };
    const selectGif = (e) => {
        setGifUrl(e.images.downsized_large.url);
        setCommentBody("");
        // you wont be able to add text comment with a gif, it will look weird :(
    };
    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const commentSubmit = (e: any, id: number) => {
        e.preventDefault();
        const formData = {
            comment_body,
            id,
            gifUrl,
        };
        props.postComment(formData);
        setCommentBody("");
        setOpenForm(false);
        console.log(divRef);
        // divRef.current.scrollIntoView({ behavior: "smooth" });
        // my attempt to scroll to the lastest comment.
        setTimeout(() => {
            divRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }, 1500);
    };
    const { post, currentUser, getNotifications } = props;
    console.log(divRef);
    return (
        <Fragment>
            {getNotifications && <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_RIGHT} />}
            <Grid item={true} sm={12} md={12} style={{ margin: "20px 0px" }}>
                <Paper style={{ padding: "20px" }}>
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
                        <Typography align="left">{post.postContent.slice(0, 50)}</Typography>
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
                    <Typography align="right">Likes: {post.likeCounts}</Typography>
                    <Grid container={true} spacing={1} style={{ padding: "20px 0px" }}>
                        <Grid item={true} sm={10} lg={10} md={10} style={{ padding: "0px 0px" }}>
                            <Typography align="left">
                                {currentUser && currentUser.user && post.userId === currentUser.user.id ? (
                                    <span style={{ cursor: "pointer" }} onClick={() => props.deletePost(post.id, post.userId)}>
                                        <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                                    </span>
                                ) : null}
                            </Typography>
                        </Grid>
                        <Grid item={true} sm={2} lg={2} style={{ padding: "0px 15px" }}>
                            <Typography align="right">
                                {Object.entries(currentUser).length === 0 ? (
                                    <Fragment>
                                        <span onClick={handleClickOpen}>
                                            <FavoriteBorderIcon style={{ color: "red", cursor: "pointer" }} />
                                        </span>
                                        {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {post.likedByMe === true ? (
                                            <span style={{ cursor: "pointer" }} onClick={() => props.dislikePost(post.id)}>
                                                <FavoriteIcon style={{ color: "red" }} />
                                            </span>
                                        ) : (
                                            <span onClick={() => props.likePost(post.id)}>
                                                <FavoriteBorderIcon style={{ color: "red", cursor: "pointer" }} />
                                            </span>
                                        )}
                                    </Fragment>
                                )}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" align="left">
                        {moment(post.createdAt).calendar()}
                    </Typography>
                    <Grid item={true} sm={12} lg={12} style={{ paddingTop: "40px" }}>
                        {Object.entries(currentUser).length === 0 ? (
                            <Fragment>
                                <Button onClick={handleClickOpen} variant="outlined" component="span" color="primary">
                                    {"Write A Comment"}
                                </Button>
                                {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Button onClick={writeComment} variant="outlined" component="span" color="primary">
                                    {openForm ? "Close" : "Write A Comment"}
                                </Button>
                            </Fragment>
                        )}
                        {openForm ? (
                            <CommentForm
                                commentChange={(e: any) => commentChange(e.target.value)}
                                comment_body={comment_body}
                                onSubmit={(e) => commentSubmit(e, post.id)}
                                gifUrl={selectGif}
                                isGif={gifUrl}
                            />
                        ) : null}
                        {post.Comments.length === 0 ? <div ref={divRef}></div> : null}
                        {post.Comments.length > 0 ? (
                            <Fragment>
                                <Typography style={{ padding: "10px 0px", margin: "20px 0px" }}>Commments</Typography>
                                <CommentList ref={divRef} user={currentUser} deleteComment={props.deleteComment} userId={post.userId} postId={post.id} comments={post.Comments} {...props} />

                                {/*  if show more hide show more button and show show less comments button */}
                            </Fragment>
                        ) : (
                            <Grid item={true} sm={12} lg={12} style={{ padding: "30px 0px" }}>
                                <Typography>No Commments Yet</Typography>
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            </Grid>
        </Fragment>
    );
}
export default PostItemContainer;
