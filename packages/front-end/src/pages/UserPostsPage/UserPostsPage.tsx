import React from 'react'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import OurWrapper from '../../atoms/OurWrapper'
import { UserPostsType } from '../../types'

function UserPosts({
    appBar,
    appBarShift,
    appOpen,
    dislikePost,
    postCommentInit,
    likePost,
    user,
    deleteComment,
    deletePostInit,
    isNotified,
    notification,
    notificationInit,
}: UserPostsType) {
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

export default GridHoc(React.memo(UserPosts))
