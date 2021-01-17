import React, { Fragment, useState, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ReactMarkdown from "react-markdown/with-html";
import ButtonFunction from "../../../common/ButtonFunction";
import "./style.css";
import { Grid } from "@material-ui/core";
import storeHooks from "../../../common/storeHooks";
import OurDate from "../../../common/Date";
import CommentBody from "../commentBody/commentBody";
import OurTextField from "../../../common/OurTextField";
import AuthButtons from "../../../common/AuthButtons";
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
            replyId,
            postId,
            userId,
            commentId,
        };
        deleteRep(data);
    };
    const memoizedDeleteReply = useCallback((replyId, postId, userId, commentId) => deleteReply(replyId, postId, userId, commentId), [deleteReply]);
    const memoizedUpdate = useCallback((comment) => update(comment), [update]);
    const { type, comment, reply } = props;

    return (
        <Fragment>
            <Grid container={true}>
                <Grid item={true} xs={12} lg={11}>
                    {type === "comment" && (
                        <Fragment>
                            {editComment && comment.comment_body ? (
                                <OurTextField type="edit-comment" comment_body={comment.comment_body} setCommentEdit={(e) => setCommentEdit(e.target.value)} />
                            ) : (
                                <CommentBody comment={comment} />
                            )}

                            {comment.comment_body && editComment ? (
                                <Fragment>
                                    <ButtonFunction type="cancel" setEditComment={setEditComment} />
                                    <ButtonFunction type="update" update={memoizedUpdate} comment={comment} />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {/* if guest is on home page */}
                                    <AuthButtons type="comment-buttons" comment={comment} user={props.user} postId={props.postId} onReply={props.onReply} setEditComment={setEditComment} />
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
                                                    deleteReply={memoizedDeleteReply}
                                                />
                                            ) : null
                                        ) : null}
                                        <OurDate type="reply-date" createdAt={reply?.createdAt} />
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
