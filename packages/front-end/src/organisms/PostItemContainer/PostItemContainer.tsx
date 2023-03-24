/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Fragment, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { toast, ToastContainer } from 'react-toastify'
import RepeatIcon from '@material-ui/icons/Repeat'
import OurLink from '../../molecules/OurLink/OurLink'
import 'react-toastify/dist/ReactToastify.css'
import storeHooks from '../../hooks/useStoreHooks/useStoreHooks'
import OurDate from '../../molecules/Date'
import AuthButtons from '../AuthButtons'
import CommentBottom from '../../organisms/CommentBottom'
import { IPostItemContainer } from '../../types'

function PostItemContainer({ post }: IPostItemContainer) {
    const [openModal, setOpenModal] = useState(false)
    const {
        rePost,
        unRepost,
        commenterId,
        user,
        postComment,
        deleteComment,
        deletePost,
        notifications,
    } = storeHooks()
    const handleClickOpen = React.useCallback(() => {
        setOpenModal(true)
    }, [setOpenModal])
    const handleCloseModal = React.useCallback(() => {
        setOpenModal(false)
    }, [setOpenModal])
    // check if user is on user posts,
    const ifOnPosts = window.location.href.indexOf('posts') !== -1
    const getNotifications = notifications
    return (
        <>
            {/* do not show notification dialong if commenter comments on a post, only show comment notification if someelse commented on a post
             do not need to see notification for your own comments
             */}
            {getNotifications && user && user.id !== commenterId && (
                <ToastContainer
                    autoClose={4000}
                    position={toast.POSITION.BOTTOM_RIGHT}
                />
            )}
            <Grid
                data-testid="post-item-container"
                item
                sm={12}
                md={12}
                style={{ margin: '20px 0px' }}
            >
                <Paper style={{ padding: '20px' }}>
                    {ifOnPosts ? (
                        <>
                            {post.RepostedByMe &&
                            user &&
                            post.userId !== user.id ? (
                                <>
                                    <Typography>
                                        <RepeatIcon
                                            style={{
                                                margin: '-5px 0px',
                                                color: 'green',
                                            }}
                                        />{' '}
                                        Repost from
                                        {post.author?.username}
                                    </Typography>
                                </>
                            ) : null}
                        </>
                    ) : null}

                    <Typography variant="h5" align="left">
                        <OurLink
                            style={{ fontSize: '16px' }}
                            to={{
                                pathname: `/post/${post.id}`,
                                state: { post },
                            }}
                            title={post.title}
                        />
                    </Typography>
                    <Grid item sm={12} md={12} style={{ padding: '30px 0px' }}>
                        <Typography
                            data-testid="post-content-testid"
                            align="left"
                        >
                            {post.postContent.slice(0, 50)}
                        </Typography>
                    </Grid>
                    <Avatar
                        style={{
                            display: 'inline-block',
                            margin: '-10px -20px',
                            padding: '0px 30px 0px 20px',
                        }}
                        sizes="small"
                        src={post.author.gravatar}
                    />
                    <Typography
                        display="inline"
                        variant="subtitle1"
                        align="left"
                    >
                        <OurLink
                            to={{
                                pathname: `/profile/${post.author?.username}`,
                                state: { post },
                            }}
                            title={post.author?.username}
                        />
                    </Typography>
                    {/* <Typography align="right" variant="body1">
                        Likes: {post.likeCounts}
                    </Typography> */}
                    <Grid container spacing={1} style={{ padding: '20px 0px' }}>
                        <Grid
                            item
                            sm={10}
                            lg={10}
                            md={10}
                            style={{ padding: '0px 0px' }}
                        >
                            <Typography align="left">
                                {user && post.userId === user.id ? (
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            deletePost(post.id, post.userId)
                                        }
                                    >
                                        <DeleteOutlineOutlinedIcon
                                            style={{ margin: '-5px 0px' }}
                                            color="primary"
                                        />{' '}
                                        <span>Delete</span>
                                    </span>
                                ) : null}
                            </Typography>
                            <Typography align="left">
                                {user && post.userId !== user.id ? (
                                    <>
                                        {post.RepostedByMe ? (
                                            <>
                                                <span
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        unRepost(
                                                            post.id,
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <RepeatIcon
                                                        style={{
                                                            margin: '-5px 0px',
                                                            color: 'green',
                                                        }}
                                                    />{' '}
                                                    <span>Un-Repost</span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    style={{
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() =>
                                                        rePost(post.id, user.id)
                                                    }
                                                >
                                                    <RepeatIcon
                                                        style={{
                                                            margin: '-5px 0px',
                                                        }}
                                                        color="primary"
                                                    />{' '}
                                                    <span>Repost</span>
                                                </span>
                                            </>
                                        )}
                                    </>
                                ) : null}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={2}
                            lg={2}
                            style={{ padding: '0px 15px' }}
                        >
                            <Typography align="right">
                                <AuthButtons
                                    type="post-buttons"
                                    handleClickOpen={handleClickOpen}
                                    handleCloseModal={handleCloseModal}
                                    post={post}
                                    openModal={openModal}
                                />
                            </Typography>
                        </Grid>
                    </Grid>

                    <OurDate type="post-date" createdAt={post.createdAt} />
                    <CommentBottom
                        post={post}
                        deleteComment={deleteComment}
                        postComment={postComment}
                    />
                </Paper>
            </Grid>
        </>
    )
}
export default PostItemContainer
