import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import ButtonFunction from './ButtonFunction'
import LikeButton from './LikeButton'
import OurModal from './OurModal'
import storehooks from './storeHooks'
import { AuthButtonType } from '../utils/types'

const UnAuthLike = styled.div``
const AuthButtons = ({
    postId,
    currentUser,
    writeComment,
    openForm,
    openModal,
    handleCloseModal,
    handleClickOpen,
    post,
    type = 'post-buttons-modal',
    comment,
    user,
    onReply,
    setEditComment,
}: AuthButtonType) => {
    const { likePost, dislikePost } = storehooks()
    const memoizedLike = React.useCallback((id) => likePost(id), [likePost])
    const memoizedDislike = React.useCallback((id) => dislikePost(id), [
        dislikePost,
    ])

    return (
        <>
            {type === 'comment-buttons' &&
                (Object.entries(user!).length !== 0 ? (
                    <>
                        {user &&
                        user.user &&
                        comment!.userId === user.user.id ? (
                            <Typography
                                style={{
                                    display: 'inline-block',
                                    float: 'right',
                                }}
                                align="right"
                            >
                                <ButtonFunction
                                    type="delete"
                                    comment={comment}
                                    userId={comment!.userId}
                                    postId={postId}
                                    commentId={comment!.id}
                                />
                            </Typography>
                        ) : null}
                        <Typography
                            style={{ display: 'inline-block', float: 'right' }}
                            align="right"
                        >
                            <ButtonFunction type="reply" onReply={onReply} />
                        </Typography>
                        {/* hide edit button if gifUrl */}
                        {!comment!.gifUrl &&
                        comment!.userId === user!.user.id ? (
                            <>
                                <Typography
                                    style={{
                                        display: 'inline-block',
                                        margin: '0px 20px',
                                        float: 'right',
                                    }}
                                    align="left"
                                >
                                    <ButtonFunction
                                        type="edit"
                                        setEditComment={setEditComment}
                                    />
                                </Typography>
                            </>
                        ) : null}
                    </>
                ) : null)}

            {type === 'post-buttons' &&
                (Object.entries(currentUser!).length === 0 ? (
                    <>
                        <UnAuthLike onClick={handleClickOpen}>
                            <LikeButton
                                like={memoizedLike}
                                type="unliked"
                                likeCounts={post!.likeCounts}
                            />
                        </UnAuthLike>
                        {openModal ? (
                            <OurModal
                                open={openModal}
                                handleClose={handleCloseModal}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        {post!.likedByMe === true ? (
                            <LikeButton
                                postId={post!.id}
                                dislike={memoizedDislike}
                                type="liked"
                                likeCounts={post!.likeCounts}
                            />
                        ) : (
                            <LikeButton
                                postId={post!.id}
                                like={memoizedLike}
                                type="unliked"
                                likeCounts={post!.likeCounts}
                            />
                        )}
                    </>
                ))}

            {type === 'post-buttons-modal' &&
                (Object.entries(currentUser!).length === 0 ? (
                    <>
                        <Button
                            onClick={handleClickOpen}
                            variant="outlined"
                            component="span"
                            color="primary"
                        >
                            Write A Comment
                        </Button>
                        {openModal ? (
                            <OurModal
                                open={openModal}
                                handleClose={handleCloseModal}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        <Button
                            onClick={writeComment}
                            variant="outlined"
                            component="span"
                            color="primary"
                        >
                            {openForm! ? 'Close' : 'Write A Comment'}
                        </Button>
                    </>
                ))}
        </>
    )
}

export default AuthButtons
