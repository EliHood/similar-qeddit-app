import React, { Fragment, useEffect } from 'react'
import storehooks from '../../hooks/useStoreHooks'
import GridHoc from '../../hoc/grid'
import PostList from '../../organisms/PostList'
import { SearchResultsPageType } from '../../types'

const SearchResultPage: React.FC<SearchResultsPageType> = ({ location }) => {
    const { posts, getSearch } = storehooks()
    const { query } = location.state
    useEffect(() => {
        getSearch(query)
    }, [query])

    return (
        <>
            <PostList posts={posts} />
        </>
    )
}

export default GridHoc(SearchResultPage)
