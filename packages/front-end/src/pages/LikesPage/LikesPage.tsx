import React, { Fragment } from 'react'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import OurWrapper from '../../atoms/OurWrapper'
import { ILikesType } from '../../types'

function LikesPage({
    appBar,
    likePost,
    deleteComment,
    dislikePost,
    deletePostInit,
    notificationInit,
    user,
    appBarShift,
    appOpen,
    postCommentInit,
    isNotified,
    notification,
}: ILikesType) {
    const { posts } = usePostsHook()
    return (
        <>
            <OurWrapper
                appBar={appBar}
                appOpen={appOpen}
                appBarShift={appBarShift}
            >
                <PostList
                    likePost={likePost}
                    deletePost={deletePostInit}
                    deleteComment={deleteComment}
                    dislikePost={dislikePost}
                    posts={posts}
                    currentUser={user}
                    postComment={postCommentInit}
                    isNotified={isNotified}
                    getNotifications={notificationInit}
                    notification={notification}
                />
            </OurWrapper>
        </>
    )
}

export default GridHoc(React.memo(LikesPage))
export { LikesPage as LikesComponent }
