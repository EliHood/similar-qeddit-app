import React, { Fragment, useEffect } from "react";
import storehooks from "../../common/storeHooks";
import GridHoc from "../hoc/grid";
import PostList from "../forms/postList/postList";
type SearchResultsPageType = {
    location?: any;
};

const SearchResultPage: React.FC<SearchResultsPageType> = (props) => {
    const { posts, getSearch, likePost, deletePost, deleteComment, dislikePost, postComment, editComment, isNotified, notifications } = storehooks();
    const query = props.location.state.query;
    const currentUser = props.location.state.currentUser;
    useEffect(() => {
        getSearch(query);
    }, [query]);
    console.log("checking for posts", posts);
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default GridHoc(SearchResultPage);
