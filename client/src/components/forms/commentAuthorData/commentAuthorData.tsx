import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import OurLink from '../../../common/OurLink'
import OurModal from '../../../common/OurModal'
import { CommentAuthorDataInterface } from '../../../utils/types'

const CommentAuthorData = ({
    comment,
    isBold,
    currentUser,
    openModal,
    handleCloseModal,
    handleClickOpen,
    userId,
}: CommentAuthorDataInterface) => {
    const isReply =
        comment.commentReplies !== undefined ? '-10px 15px' : '-10px 0px'
    const checkUser = currentUser === undefined ? {} : currentUser
    return (
        <>
            <img
                alt="gravatar"
                style={{ margin: isReply }}
                src={comment.author?.gravatar}
                width="30"
                height="30"
            />
            <Typography
                style={{
                    display: 'inline-block',
                    margin: '10px 10px',
                    fontWeight: 700,
                    padding: '0px 0px',
                }}
                variant="h6"
                align="left"
            >
                {Object.entries(checkUser).length === 0 ? (
                    <>
                        <span
                            style={{
                                fontSize: '12px',
                                margin: '0px',
                                padding: '0px',
                                cursor: 'pointer',
                            }}
                            onClick={handleClickOpen}
                        >
                            {comment.author?.username}
                            {comment?.userId === userId && (
                                <span style={{ fontSize: '12px' }}> (OP)</span>
                            )}
                        </span>

                        {openModal ? (
                            <OurModal
                                open={openModal}
                                handleClose={handleCloseModal}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        <OurLink
                            style={{
                                fontSize: '12px',
                            }}
                            to={{
                                pathname: `/profile/${comment.author?.username}`,
                            }}
                            title={comment.author?.username}
                        />
                        {comment?.userId === userId && (
                            <span style={{ fontSize: '12px' }}> (OP)</span>
                        )}
                    </>
                )}
            </Typography>
        </>
    )
}
export default CommentAuthorData
