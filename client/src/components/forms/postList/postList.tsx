import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurLink from "../../common/OurLink";
import CommentForm from "../../forms/comment/CommentForm";
import CommentList from "../../forms/commentList/CommentList";

export default function PostList(props: any) {
    const [isComment, setIsComment] = useState(false);
    const [comment_body, setCommentBody] = useState("");
    const [gifUrl, setGifUrl] = useState("");
    const [ourNotifications, setNotifications] = useState([]);
    const didMountRef = useRef();
    useEffect(() => {
        if (!didMountRef.current) {
            props.getNotifications();
        } else {
            console.log("test");
        }
    });
    const writeComment = (id) => {
        setIsComment(isComment ? "" : id);
    };

    const commentChange = (comment) => {
        setGifUrl("");
        setCommentBody(comment);
    };
    const selectGif = (e) => {
        console.log(e);
        setGifUrl(e.images.downsized_large.url);
        setCommentBody("");
        // you wont be able to add text comment with a gif, it will look weird :(
    };

    const commentSubmit = (e: any, id: number) => {
        e.preventDefault();
        const formData = {
            comment_body,
            id,
            gifUrl,
        };
        props.postComment(formData);
        setIsComment(false);
        setCommentBody("");
    };
    const { posts, currentUser, isNotified, notification } = props;
    console.log(notification);
    return posts.length > 0 ? (
        posts.map((post, i) => (
            <Fragment key={i}>
                {notification && <ToastContainer autoClose={1000} position={toast.POSITION.BOTTOM_RIGHT} />}
                <Grid item={true} sm={12} md={12} style={{ margin: "20px 0px" }}>
                    <Paper style={{ padding: "20px" }}>
                        <Typography variant="h5" align="left">
                            <OurLink
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
                                    {post.likedByMe === true ? (
                                        <span style={{ cursor: "pointer" }} onClick={() => props.dislikePost(post.id)}>
                                            <FavoriteIcon style={{ color: "red" }} />
                                        </span>
                                    ) : (
                                        <span onClick={() => props.likePost(post.id)}>
                                            <FavoriteBorderIcon style={{ color: "red", cursor: "pointer" }} />
                                        </span>
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" align="left">
                            {moment(post.createdAt).calendar()}
                        </Typography>
                        <Grid item={true} sm={12} lg={12} style={{ paddingTop: "40px" }}>
                            <Button onClick={() => writeComment(post.id)} variant="outlined" component="span" color="primary">
                                {isComment === post.id ? "Close" : "Write A Comment"}
                            </Button>
                            {isComment === post.id ? (
                                <CommentForm
                                    commentChange={(e: any) => commentChange(e.target.value)}
                                    comment_body={comment_body}
                                    onSubmit={(e) => commentSubmit(e, post.id)}
                                    gifUrl={selectGif}
                                    isGif={gifUrl}
                                />
                            ) : null}

                            {post.Comments.length > 0 ? (
                                <Fragment>
                                    <Typography style={{ padding: "10px 0px", margin: "20px 0px" }}>Commments</Typography>
                                    <CommentList user={currentUser} deleteComment={props.deleteComment} userId={post.userId} postId={post.id} comments={post.Comments} />
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
        ))
    ) : (
        <div>
            <Grid item={true} md={8}>
                <Typography>No Posts yet</Typography>
            </Grid>
        </div>
    );
}
