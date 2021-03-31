import React, { Fragment, useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ReactMarkdown from 'react-markdown/with-html';
import ButtonFunction from '../../../common/ButtonFunction';
import './style.css';
import { Grid } from '@material-ui/core';
import storeHooks from '../../../common/storeHooks';
import OurDate from '../../../common/Date';
import CommentBody from '../commentBody/commentBody';
import OurTextField from '../../../common/OurTextField';
import AuthButtons from '../../../common/AuthButtons';
import { CommentItemPropsType } from '../../../utils/types';

const CommentItem: React.FC<CommentItemPropsType> = ({
    type, comment, reply, editComment, user, onReply, postId,
}) => {
    const [commentEdit, setCommentEdit] = useState('');
    const [editCommentValue, setEditComment] = useState(false);
    const { deleteRep } = storeHooks();

    const update = (comment) => {
        const data = {
            comment_body: commentEdit,
            id: comment.id,
            postId: comment.postId,
            userId: comment.userId,
        };
        editComment(data);
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

    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={11}>
                    {type === 'comment' && (
                        <>
                            {editCommentValue && comment.comment_body ? (
                                <OurTextField type="edit-comment" comment_body={comment.comment_body} setCommentEdit={(e) => setCommentEdit(e.target.value)} />
                            ) : (
                                <CommentBody comment={comment} />
                            )}

                            {comment.comment_body && editCommentValue ? (
                                <>
                                    <ButtonFunction type="cancel" setEditComment={setEditComment} />
                                    <ButtonFunction type="update" update={memoizedUpdate} comment={comment} />
                                </>
                            ) : (
                                <>
                                    {/* if guest is on home page */}
                                    <AuthButtons type="comment-buttons" comment={comment} user={user} postId={postId} onReply={onReply} setEditComment={setEditComment} />
                                </>
                            )}
                        </>
                    )}

                    {type === 'reply' && (
                        <>
                            <div data-testid="reply-data">
                                <Grid container>
                                    <Grid item xs={12} lg={11}>
                                        <div data-testid="reply-body">
                                            <ReactMarkdown className="markdownStyle" source={reply?.replyBody} />
                                        </div>
                                        {Object.entries(user).length !== 0 ? (
                                            user && user.user && reply?.userId === user.user.id ? (
                                                <ButtonFunction
                                                    type="deleteReply"
                                                    replyId={reply.id}
                                                    replyUserId={reply.userId}
                                                    commentId={comment.id}
                                                    postId={postId}
                                                    deleteReply={memoizedDeleteReply}
                                                />
                                            ) : null
                                        ) : null}
                                        <OurDate type="reply-date" createdAt={reply?.createdAt} />
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    )}
                </Grid>
            </Grid>
        </>
    );
};
export default CommentItem;
