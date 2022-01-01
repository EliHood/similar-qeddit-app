import React, { RefForwardingComponent, useState, Fragment } from 'react'
import List from '@material-ui/core/List'
import CommentItem from '../commentItem/CommentItem'
import ReplyForm from '../reply/ReplyForm'
import storeHooks from '../../../common/storeHooks'
import CommentAuthorData from '../commentAuthorData/commentAuthorData'

const ourStyle = {
    margin: '15px ',
}
const CommentListContainer: RefForwardingComponent<HTMLDivElement, any> = (
    props,
    ref
) => {
    const {
        comment,
        openModal,
        handleClickOpen,
        handleCloseModal,
        isBold,
        postId,
    } = props
    const { replyComm, editComment, deleteComment, user } = storeHooks()
    const [replyComment, setReplyComment] = useState(false)
    const [addReply, setReply] = useState('')
    const replySubmit = React.useCallback(
        (e: any) => {
            e.preventDefault()
            const data = {
                replyBody: addReply,
                userId: user.id,
                postId,
                commentId: comment.id,
            }

            replyComm(data)
            setReplyComment(false)
            setReply('')
        },
        [replyComm, setReplyComment, setReply]
    )
    // this pass onReply to CommentItem component, when its clicked from commentItem it will call this function which displays
    // the reply Form
    const onReply = React.useCallback(() => {
        setReplyComment(!replyComment)
    }, [setReplyComment, replyComment])
    return (
        <List
            innerRef={ref}
            style={{ paddingBottom: '20px' }}
            data-testid="comment-list-container"
        >
            <CommentAuthorData
                currentUser={user}
                comment={comment}
                openModal={openModal}
                userId={user?.id}
                handleClickOpen={handleClickOpen}
                handleCloseModal={handleCloseModal}
                isBold={isBold}
            />

            {/* here you pass your ref */}
            <div style={ourStyle} data-testid="commentitem-wrapper">
                <CommentItem
                    onReply={onReply}
                    type="comment"
                    comment={comment}
                    postId={postId}
                    deleteComment={deleteComment}
                    editComment={editComment}
                />

                {comment.commentReplies.length !== 0 ? (
                    <div style={{ marginLeft: '30px', padding: '20px' }}>
                        {comment.commentReplies.map((reply) => (
                            <Fragment key={comment.id}>
                                <div style={{ padding: '5px' }}>
                                    <CommentAuthorData
                                        comment={reply}
                                        currentUser={user}
                                        openModal={openModal}
                                        handleClickOpen={handleClickOpen}
                                        handleCloseModal={handleCloseModal}
                                        isBold={isBold}
                                        userId={user?.id}
                                    />
                                    <CommentItem
                                        type="reply"
                                        reply={reply}
                                        comment={comment}
                                        onReply={onReply}
                                        postId={postId}
                                        deleteComment={deleteComment}
                                        editComment={null}
                                    />
                                </div>
                            </Fragment>
                        ))}
                        {replyComment && (
                            <ReplyForm
                                onSubmit={(e) => replySubmit(e)}
                                replyBody={addReply}
                                replyChange={(e) => setReply(e.target.value)}
                            />
                        )}
                    </div>
                ) : (
                    <div style={{ marginLeft: '30px', padding: '0px' }}>
                        {replyComment && (
                            <ReplyForm
                                onSubmit={(e) => replySubmit(e)}
                                replyBody={addReply}
                                replyChange={(e) => setReply(e.target.value)}
                            />
                        )}
                    </div>
                )}
            </div>
        </List>
    )
}

// you use forwardRef here
export default React.forwardRef(CommentListContainer)
