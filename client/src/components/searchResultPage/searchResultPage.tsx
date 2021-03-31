import React, { Fragment, useEffect } from 'react';
import storehooks from '../../common/storeHooks';
import GridHoc from '../hoc/grid';
import PostList from '../forms/postList/postList';
import { SearchResultsPageType } from '../../utils/types';

const SearchResultPage: React.FC<SearchResultsPageType> = ({ location }) => {
    const {
        posts, getSearch, likePost, deletePost, deleteComment, dislikePost, postComment, editComment, isNotified, notifications,
    } = storehooks();
    const { query } = location.state;
    const { currentUser } = location.state;
    useEffect(() => {
        getSearch(query);
    }, [query]);

    return (
        <>
            <PostList
                likePost={likePost}
                deletePost={deletePost}
                deleteComment={deleteComment}
                dislikePost={dislikePost}
                posts={posts}
                currentUser={currentUser}
                postComment={postComment}
                isNotified={isNotified}
                getNotifications={notifications}
                editComment={editComment}
            />
        </>
    );
};

export default GridHoc(SearchResultPage);
