import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import OurLink from '../../../common/OurLink';
import OurModal from '../../../common/OurModal';

type CommentAuthorDataInterface = {
  comment: {
    author: {
      username: string;
      gravatar: string;
    };
    userId: number;
    commentReplies: any;
  };
  userId: number;
  isBold: any;
  openModal: () => void;
  handleCloseModal: () => void;
  handleClickOpen: () => void;
  currentUser: Record<string, any>;
}
const CommentAuthorData = ({
  comment, isBold, currentUser, openModal, handleCloseModal, handleClickOpen, userId,
}: CommentAuthorDataInterface) => {
  const isReply = comment.commentReplies !== undefined ? '-10px 15px' : '-10px 0px';

  return (
    <>
      <img alt="gravatar" style={{ margin: isReply }} src={comment.author.gravatar} width="30" height="30" />
      <Typography
        style={{
          display: 'inline-block', margin: '10px 10px', fontWeight: 700, padding: '0px 0px',
        }}
        variant="h6"
        align="left"
      >
        {Object.entries(currentUser).length === 0 ? (
          <>
            <span
              style={{
                fontSize: '12px', margin: '0px', padding: '0px', cursor: 'pointer', fontWeight: isBold(comment),
              }}
              onClick={handleClickOpen}
            >
              {comment.author.username}
              {comment.userId === userId && <span style={{ fontSize: '12px' }}> (OP)</span>}
            </span>

            {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
          </>
        ) : (
          <>
            <OurLink
              style={{ fontSize: '12px', fontWeight: isBold(comment) }}
              to={{
                pathname: `/profile/${comment.author.username}`,
              }}
              title={comment.author.username}
            />
            {comment.userId === userId && <span style={{ fontSize: '12px' }}> (OP)</span>}
          </>
        )}
      </Typography>
    </>
  );
};
export default CommentAuthorData;
