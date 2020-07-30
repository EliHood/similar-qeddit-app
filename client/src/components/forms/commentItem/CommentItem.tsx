import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import ReplyIcon from "@material-ui/icons/Reply";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ReactMarkdown from "react-markdown/with-html";
import CommentForm from "../comment/CommentForm";
import ReplyForm from "../reply/ReplyForm";
import "./style.css";
import moment from "moment";
import { Grid } from "@material-ui/core";
import storeHooks from "../../../common/storeHooks";

export interface CommentItemInterface {
    editComment: (comment) => void;
    comment: {
        comment_body: string;
        gifUrl: string;
        userId: number;
        id: number;
        createdAt: any;
    };
    reply: {
        createdAt: any;
        replyBody: string;
        userId: number;
        id: number;
    };
    type: string;
    postId: number;
    deleteComment: (commentId, postId, userId) => void;
    edit: () => void;
    user: {
        user: {
            id: number;
        };
        id: number;
    };
}

function CommentItem(props: CommentItemInterface) {
    const [commentEdit, setCommentEdit] = useState("");
    const [editComment, setEditComment] = useState(false);
    const { deleteRep } = storeHooks();

    const update = (comment) => {
        const data = {
            comment_body: commentEdit,
            id: comment.id,
            postId: comment.postId,
            userId: comment.userId,
        };
        props.editComment(data);
        setEditComment(false);
    };
    const deleteReply = (replyId, postId, userId, commentId) => {
        const data = {
            replyId: replyId,
            postId: postId,
            userId: userId,
            commentId: commentId,
        };
        deleteRep(data);
    };

    const { type } = props;

    return (
        <Fragment>
            {type === "comment" && (
                <Fragment>
                    {editComment && props.comment.comment_body ? (
                        <Fragment>
                            <TextField
                                className="commentInput"
                                type="text"
                                style={{ borderRadius: "50%" }}
                                id="outlined-multiline-static"
                                multiline={true}
                                name="comment_body"
                                defaultValue={props.comment.comment_body}
                                rows="2"
                                fullWidth={true}
                                margin="normal"
                                variant="outlined"
                                onChange={(e) => setCommentEdit(e.target.value)}
                            />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Grid container={true}>
                                <Grid item={true} xs={12} lg={11}>
                                    {props.comment.gifUrl === "" && <ReactMarkdown className="markdownStyle" source={props.comment.comment_body} />}

                                    {!props.edit && props.comment.gifUrl && <img style={{ width: "55%" }} src={`${props.comment.gifUrl}`} />}
                                    <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                                        {moment(props.comment.createdAt).calendar()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )}

                    {props.comment.comment_body && editComment ? (
                        <Fragment>
                            <Typography style={{ display: "inline-block", margin: "0px 20px", float: "right" }} align="left">
                                <span style={{ cursor: "pointer" }} onClick={() => setEditComment(false)}>
                                    <ClearIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Cancel</span>
                                </span>
                            </Typography>
                            <Typography style={{ display: "inline-block", margin: "0px 20px", float: "right" }} align="left">
                                <span style={{ cursor: "pointer" }} onClick={() => update(props.comment)}>
                                    <AddCircleOutlineIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Update</span>
                                </span>
                            </Typography>

                            {/* add reply feature here */}
                        </Fragment>
                    ) : (
                        <Fragment>
                            {/* if guest is on home page */}
                            {Object.entries(props.user).length !== 0 ? (
                                <Fragment>
                                    {props.user && props.user.user && props.comment.userId === props.user.user.id ? (
                                        <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                            <span style={{ cursor: "pointer" }} onClick={() => props.deleteComment(props.comment.id, props.postId, props.comment.userId)}>
                                                <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                                            </span>
                                        </Typography>
                                    ) : null}
                                    {/* hide edit button if gifUrl */}
                                    {!props.comment.gifUrl && props.comment.userId === props.user.user.id ? (
                                        <Fragment>
                                            <Typography style={{ display: "inline-block", margin: "0px 20px", float: "right" }} align="left">
                                                <span style={{ cursor: "pointer" }} onClick={() => setEditComment(true)}>
                                                    <EditIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Edit</span>
                                                </span>
                                            </Typography>
                                        </Fragment>
                                    ) : null}
                                </Fragment>
                            ) : null}
                        </Fragment>
                    )}
                </Fragment>
            )}

            {type === "reply" && (
                <Fragment>
                    <Fragment>
                        <Grid container={true}>
                            <Grid item={true} xs={12} lg={11}>
                                <ReactMarkdown className="markdownStyle" source={props.reply.replyBody} />
                                {Object.entries(props.user).length !== 0 ? (
                                    props.user && props.user.user && props.reply.userId === props.user.user.id ? (
                                        <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                            <span style={{ cursor: "pointer" }} onClick={() => deleteReply(props.reply.id, props.postId, props.reply.userId, props.comment.id)}>
                                                <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px" }} color="primary" /> <span>Delete</span>
                                            </span>
                                        </Typography>
                                    ) : null
                                ) : null}
                                <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                                    {moment(props.reply.createdAt).calendar()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Fragment>
                </Fragment>
            )}
        </Fragment>
    );
}
export default CommentItem;
