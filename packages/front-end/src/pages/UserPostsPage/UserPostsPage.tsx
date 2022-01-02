import React from 'react'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import OurWrapper from '../../atoms/OurWrapper'
import { UserPostsType } from '../../types'

function UserPosts({ appBar, appBarShift, appOpen }: UserPostsType) {
    const { posts } = usePostsHook()
    return (
        <>
            <OurWrapper
                appBar={appBar}
                appOpen={appOpen}
                appBarShift={appBarShift}
            >
                <PostList posts={posts} />
            </OurWrapper>
        </>
    )
}

export default GridHoc(React.memo(UserPosts))
