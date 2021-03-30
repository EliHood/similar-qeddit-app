import React, { Fragment } from 'react';
import PostList from '../forms/postList/postList';
import GridHoc from '../hoc/grid';
import usePostsHook from '../../common/usePostHook';
import OurWrapper from '../../common/OurWrapper';
import { ILikesType } from '../../utils/types';

function Likes({
  appBar, likePost, deleteComment, dislikePost, deletePostInit, notificationInit, user, appBarShift, appOpen, postCommentInit, isNotified, notification,
}:ILikesType) {
  const { posts } = usePostsHook();
  return (
    <>
      <OurWrapper appBar={appBar} appOpen={appOpen} appBarShift={appBarShift}>
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
  );
}

export default GridHoc(React.memo(Likes));
export { Likes as LikesComponent };
