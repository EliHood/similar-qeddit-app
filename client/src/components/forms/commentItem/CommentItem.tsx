import React, { Fragment, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ReactMarkdown from "react-markdown/with-html";
import ButtonFunction from "../../../common/ButtonFunction";
import ReplyIcon from "@material-ui/icons/Reply";
import "./style.css";
import moment from "moment";
import { Grid } from "@material-ui/core";
import storeHooks from "../../../common/storeHooks";
import { MentionsInput, Mention } from "react-mentions";
type CommentItemProps = {
    editComment: (comment) => void;
    onReply: () => void;
    comment: {
        comment_body: string;
        gifUrl: string;
        userId: number;
        id: number;
        createdAt: any;
    };
    reply?: {
        createdAt: any;
        replyBody: string;
        userId: number;
        id: number;
    } | null;
    type: "comment" | "reply";
    postId: number;
    deleteComment: (commentId, postId, userId) => void;
    edit: () => void;
    user: {
        user: {
            id: number;
        };
        id: number;
    };
};

const CommentItem: React.FC<CommentItemProps> = (props) => {
    const [commentEdit, setCommentEdit] = useState("");
    const [editComment, setEditComment] = useState(false);
    const [mention, setMentionedUser] = useState();
    const { deleteRep, mentionUsers } = storeHooks();

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

    const { type, comment, reply } = props;

    return (
        <Fragment>
            <Grid container={true}>
                <Grid item={true} xs={12} lg={11}>
                    {type === "comment" && (
                        <Fragment>
                            {editComment && comment.comment_body ? (
                                <Fragment>
                                    <TextField
                                        inputProps={{
                                            "data-testid": "comment-item-textfield",
                                        }}
                                        className="commentInput"
                                        type="text"
                                        style={{ borderRadius: "50%" }}
                                        id="outlined-multiline-static"
                                        multiline={true}
                                        name="comment_body"
                                        defaultValue={comment.comment_body}
                                        rows="2"
                                        fullWidth={true}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={(e) => setCommentEdit(e.target.value)}
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div data-testid="comment-body">{comment.gifUrl === "" && <ReactMarkdown className="markdownStyle" source={comment.comment_body} />}</div>

                                    {!props.edit && comment.gifUrl && <img style={{ width: "55%", clear: "both", display: "block" }} src={`${comment.gifUrl}`} />}
                                    <Typography id="date" style={{ fontSize: "12px" }} variant="caption" align="left">
                                        {moment(comment.createdAt).calendar()}
                                    </Typography>
                                </Fragment>
                            )}

                            {comment.comment_body && editComment ? (
                                <Fragment>
                                    <ButtonFunction type="cancel" setEditComment={setEditComment} />
                                    <ButtonFunction type="update" update={update} comment={comment} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {/* if guest is on home page */}
                                    {Object.entries(props.user).length !== 0 ? (
                                        <Fragment>
                                            {props.user && props.user.user && comment.userId === props.user.user.id ? (
                                                <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                                    <ButtonFunction type="delete" comment={comment} userId={comment.userId} postId={props.postId} commentId={comment.id} />
                                                </Typography>
                                            ) : null}
                                            <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                                <ButtonFunction type="reply" onReply={props.onReply} />
                                            </Typography>
                                            {/* hide edit button if gifUrl */}
                                            {!comment.gifUrl && comment.userId === props.user.user.id ? (
                                                <Fragment>
                                                    <Typography style={{ display: "inline-block", margin: "0px 20px", float: "right" }} align="left">
                                                        <ButtonFunction type="edit" setEditComment={setEditComment} />
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
                            <div data-testid="reply-data">
                                <Grid container={true}>
                                    <Grid item={true} xs={12} lg={11}>
                                        <div data-testid="reply-body">
                                            <ReactMarkdown className="markdownStyle" source={reply?.replyBody} />
                                        </div>
                                        {Object.entries(props.user).length !== 0 ? (
                                            props.user && props.user.user && reply?.userId === props.user.user.id ? (
                                                <ButtonFunction
                                                    type="deleteReply"
                                                    replyId={reply.id}
                                                    replyUserId={reply.userId}
                                                    commentId={comment.id}
                                                    postId={props.postId}
                                                    deleteReply={deleteReply}
                                                />
                                            ) : null
                                        ) : null}
                                        <Typography style={{ fontSize: "12px" }} variant="caption" align="left">
                                            {moment(reply?.createdAt).calendar()}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </Fragment>
                    )}
                </Grid>
            </Grid>
        </Fragment>
    );
};
export default CommentItem;
