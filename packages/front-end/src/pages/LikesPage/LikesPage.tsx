import React, { Fragment } from 'react'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import OurWrapper from '../../atoms/OurWrapper'
import { ILikesType } from '../../types'

function LikesPage({ appBar, appBarShift, appOpen }: ILikesType) {
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

export default GridHoc(React.memo(LikesPage))
export { LikesPage as LikesComponent }
