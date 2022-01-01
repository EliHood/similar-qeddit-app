import React, { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { Grid } from '@material-ui/core'
import ButtonFunction from '../../molecules/ButtonFunction'
import storeHooks from '../../hooks/useStoreHooks'
import OurDate from '../../molecules/Date/Date'
import CommentBody from '../../molecules/CommentBody'
import OurTextField from '../../molecules/OurTextField'
import AuthButtons from '../AuthButtons'
import { CommentItemPropsType } from '../../types'
import './style.css'

const CommentItem: React.FC<CommentItemPropsType> = ({
    type,
    comment,
    reply,
    editComment,
    onReply,
    postId,
}) => {
    const [commentEdit, setCommentEdit] = useState('')
    const [editCommentValue, setEditComment] = useState(false)
    const { deleteRep, user } = storeHooks()
    const checkUser = user === undefined ? {} : user
    const update = (commentData) => {
        const data = {
            comment_body: commentEdit,
            id: commentData.id,
            postId: commentData.postId,
            userId: commentData.userId,
        }
        editComment(data)
        setEditComment(false)
    }

    const deleteReply = (replyId, postId, userId, commentId) => {
        const data = {
            replyId,
            postId,
            userId,
            commentId,
        }
        deleteRep(data)
    }

    const memoizedDeleteReply = useCallback(
        (replyId, postId, userId, commentId) =>
            deleteReply(replyId, postId, userId, commentId),
        [deleteReply]
    )
    const memoizedUpdate = useCallback((comment) => update(comment), [update])
    const commentData = (
        <>
            {editCommentValue && comment.comment_body ? (
                <OurTextField
                    type="edit-comment"
                    comment_body={comment.comment_body}
                    setCommentEdit={(e) => setCommentEdit(e.target.value)}
                />
            ) : (
                <CommentBody
                    comment_body={comment.comment_body}
                    gifUrl={comment.gifUrl}
                    createdAt={comment.createdAt}
                />
            )}

            {comment.comment_body && editCommentValue ? (
                <>
                    <ButtonFunction
                        type="cancel"
                        setEditComment={setEditComment}
                    />
                    <ButtonFunction
                        type="update"
                        update={memoizedUpdate}
                        comment={comment}
                    />
                </>
            ) : (
                <>
                    {/* if guest is on home page */}
                    <AuthButtons
                        type="comment-buttons"
                        comment={comment}
                        postId={postId}
                        onReply={onReply}
                        setEditComment={setEditComment}
                    />
                </>
            )}
        </>
    )
    const replyButton =
        user && reply?.userId === user.id ? (
            <ButtonFunction
                type="deleteReply"
                replyId={reply.id}
                replyUserId={reply.userId}
                comment={comment}
                postId={postId}
                deleteReply={memoizedDeleteReply}
            />
        ) : null
    const replyData = (
        <>
            <div data-testid="reply-data">
                <Grid container>
                    <Grid item xs={12} lg={11}>
                        <div data-testid="reply-body">
                            <ReactMarkdown
                                className="markdownStyle"
                                source={reply?.replyBody}
                            />
                        </div>
                        {Object.entries(checkUser).length !== 0
                            ? replyButton
                            : null}
                        <OurDate
                            type="reply-date"
                            createdAt={reply?.createdAt}
                        />
                    </Grid>
                </Grid>
            </div>
        </>
    )
    return (
        <>
            <Grid container>
                <Grid item xs={12} lg={11}>
                    {type === 'comment' && commentData}
                    {type === 'reply' && replyData}
                </Grid>
            </Grid>
        </>
    )
}
export default CommentItem
