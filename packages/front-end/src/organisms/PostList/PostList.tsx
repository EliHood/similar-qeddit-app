import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import 'react-toastify/dist/ReactToastify.css'
import PostItemContainer from '../PostItemContainer'
import storeHooks from '../../hooks/useStoreHooks'
import OurLoader from '../../atoms/OurLoader'

function PostList(props: any) {
    const { posts } = props
    const { loading } = storeHooks()
    console.log('posts', posts);
    return loading ? (
        <OurLoader />
    ) : (
        <>
            {posts.length > 0 ? (
                posts.map((post, i) => (
                    <div key={post.id} data-testid="post-list">
                        <PostItemContainer post={post} />
                    </div>
                ))
            ) : (
                <div data-testid="no-posts">
                    <Grid item md={8}>
                        <Typography>No Posts yet</Typography>
                    </Grid>
                </div>
            )}
        </>
    )
}

export default React.memo(PostList)
