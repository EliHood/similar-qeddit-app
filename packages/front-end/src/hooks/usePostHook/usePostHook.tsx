import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActions, selectors } from '@mfe/redux-store/src'

function usePostsHooks() {
    const dispatch = useDispatch()
    const posts = useSelector(selectors.getPosts)
    React.useEffect(() => {
        dispatch(postActions.getPostsInit())
        dispatch(postActions.initCommentUpdates())
    }, [])

    return { posts }
}

export default usePostsHooks
