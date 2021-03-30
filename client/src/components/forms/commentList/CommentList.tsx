import React, { Fragment, useState, Ref } from 'react';
import Grid from '@material-ui/core/Grid';
import OurSecondaryButton from '../../../common/OurSecondaryButton';
import CommentListContainer from '../commentListContainer/commentListContainer';

function CommentList(props: any, ref: Ref<HTMLDivElement>) {
  const [showMore, setShowMore] = useState<number>(2);
  const [openModal, setOpenModal] = useState(false);
  const [showLessFlag, setShowLessFlag] = useState<boolean>(false);
  const the_comments = props.comments.length;
  const inc = showMore as any;
  const min = Math.min(2, the_comments - inc);
  const showComments = (e) => {
    e.preventDefault();

    if (inc + 2 && inc <= the_comments) {
      setShowMore(inc + 2);
      setShowLessFlag(true);
    } else {
      setShowMore(the_comments);
    }
  };

  const handleClickOpen = React.useCallback(() => {
    console.log('this got called owl man');
    setOpenModal(true);
  }, [setOpenModal]);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const showLessComments = React.useCallback(
    (e) => {
      e.preventDefault();
      setShowMore(2);
      setShowLessFlag(false);
    },
    [setShowMore, setShowLessFlag],
  );
  const isBold = (comment) => (comment.userId === props.userId ? 800 : 400);

  // show comments by recent, and have the latest comment at the bottom, with the previous one just before it.
  const filterComments = props.comments
    .slice(0)
    .sort((a, b) => {
      const date1 = new Date(a.createdAt) as any;
      const date2 = new Date(b.createdAt) as any;

      return date2 - date1;
    })
    .slice(0, inc)
    .reverse();

  const showMoreComments = () => filterComments.map((comment, i) => (
    <div data-testid={`comment-show-more-${i}`} key={i}>
      <CommentListContainer ref={ref} comment={comment} openModal={openModal} handleCloseModal={handleCloseModal} isBold={isBold} handleClickOpen={handleClickOpen} {...props} />
    </div>
  ));

  const showMoreLess = (
    <div style={{ margin: '30px 0px' }} data-testid="show_more_less">
      {props.comments.length > 2 ? (
        <>
          {min !== -1 && min !== -2 ? (
            <>
              {min !== 0 ? (
                <OurSecondaryButton test="show_more_button" onClick={(e) => showComments(e)} component="span" color="secondary">
                  View
                  {' '}
                  {min !== -1 && min !== -2 ? min : 0}
                  {' '}
                  More Comments
                </OurSecondaryButton>
              ) : (
                <OurSecondaryButton test="show_less_button" onClick={(e) => showLessComments(e)} component="span" color="secondary">
                  Show Less Comments
                </OurSecondaryButton>
              )}
            </>
          ) : (
            <OurSecondaryButton test="show_less_button" onClick={(e) => showLessComments(e)} component="span" color="secondary">
              Show Less Comments
            </OurSecondaryButton>
          )}
        </>
      ) : null}
    </div>
  );

  return (
    <Grid data-testid="comment-list-div">
      <>{showMoreLess}</>
      {showLessFlag === true ? (
      // will show most recent comments below
        showMoreComments()
      ) : (
        <>
          {/* filter based on first comment  */}
          {filterComments.map((comment, i) => (
            <div key={i} ref={ref} className="comment">
              <CommentListContainer ref={ref} comment={comment} openModal={openModal} handleCloseModal={handleCloseModal} isBold={isBold} handleClickOpen={handleClickOpen} {...props} />
            </div>
          ))}
        </>
      )}
    </Grid>
  );
}

export default React.forwardRef(CommentList) as React.RefForwardingComponent<HTMLDivElement, any>;
