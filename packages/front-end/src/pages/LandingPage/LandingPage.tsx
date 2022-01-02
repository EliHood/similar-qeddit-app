import React, { Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import PostList from '../../organisms/PostList'
import GridHoc from '../../hoc/grid'
import usePostsHook from '../../hooks/usePostHook'
import storeMethods from '../../hooks/useStoreHooks'
import OurError from '../../molecules/OurError'
import OurWrapper from '../../atoms/OurWrapper'

function Landing(props: any) {
    const { appBar, appOpen, appBarShift } = props
    const { posts } = usePostsHook()
    const { errPost } = storeMethods()
    return (
        <>
            <OurWrapper
                appBar={appBar}
                appOpen={appOpen}
                appBarShift={appBarShift}
            >
                <Typography variant="subtitle1" align="left">
                    Post's from our users
                </Typography>

                {errPost && <OurError />}
                <PostList posts={posts} />
            </OurWrapper>
        </>
    )
}
export default React.memo(GridHoc(Landing))

export { Landing as LandingComponent }
