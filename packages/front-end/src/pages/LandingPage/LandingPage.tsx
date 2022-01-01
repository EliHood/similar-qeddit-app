import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import storeMethods from '../../hooks/useStoreHooks'
import OurError from '../../molecules/OurError'
import OurWrapper from '../../atoms/OurWrapper'

function Landing(props: any) {
    const { posts } = usePostsHook()
    const {
        likePost,
        errPost,
        deletePost,
        deleteComment,
        dislikePost,
        user,
        postComment,
        isNotified,
        notifications,
        editComment,
    } = storeMethods()
    return (
        <>
            <OurWrapper
                appBar={props.appBar}
                appOpen={props.appOpen}
                appBarShift={props.appBarShift}
            >
                <Typography variant="subtitle1" align="left">
                    Post's from our users
                </Typography>

                {errPost && <OurError />}
                <PostList
                    likePost={likePost}
                    deletePost={deletePost}
                    deleteComment={deleteComment}
                    dislikePost={dislikePost}
                    posts={posts}
                    currentUser={user}
                    postComment={postComment}
                    isNotified={isNotified}
                    getNotifications={notifications}
                    editComment={editComment}
                />
            </OurWrapper>
        </>
    )
}
export default React.memo(GridHoc(Landing))

export { Landing as LandingComponent }
