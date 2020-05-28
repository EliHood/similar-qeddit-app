import React, { Fragment, useState, Ref } from "react";
import Grid from "@material-ui/core/Grid";
import OurSecondaryButton from "../../../common/OurSecondaryButton";
import CommentListContainer from "../commentListContainer/commentListContainer";

function CommentList(props: any, ref: Ref<HTMLDivElement>) {
    const [showMore, setShowMore] = useState<Number>(2);
    const [openModal, setOpenModal] = useState(false);
    const [showLessFlag, setShowLessFlag] = useState<Boolean>(false);
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
    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const showLessComments = (e) => {
        e.preventDefault();
        setShowMore(2);
        setShowLessFlag(false);
    };
    const isBold = (comment) => {
        return comment.userId === props.userId ? 800 : 400;
    };
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

    const showMoreComments = () => {
        return filterComments.map((comment, i) => (
            <div key={i}>
                <CommentListContainer ref={ref} comment={comment} openModal={openModal} handleCloseModal={handleCloseModal} isBold={isBold} handleClickOpen={handleClickOpen} {...props} />
            </div>
        ));
    };
    console.log(ref);
    return (
        <Grid data-testid="comment-list-div">
            <Fragment>
                <div style={{ margin: "30px 0px" }}>
                    {props.comments.length > 2 ? (
                        <Fragment>
                            {min !== -1 && min !== -2 ? (
                                <Fragment>
                                    {min !== 0 ? (
                                        <OurSecondaryButton onClick={(e) => showComments(e)} component="span" color="secondary">
                                            View {min !== -1 && min !== -2 ? min : 0} More Comments
                                        </OurSecondaryButton>
                                    ) : (
                                        <OurSecondaryButton onClick={(e) => showLessComments(e)} component="span" color="secondary">
                                            Show Less Comments
                                        </OurSecondaryButton>
                                    )}
                                </Fragment>
                            ) : (
                                <OurSecondaryButton onClick={(e) => showLessComments(e)} component="span" color="secondary">
                                    Show Less Comments
                                </OurSecondaryButton>
                            )}
                        </Fragment>
                    ) : null}
                </div>
            </Fragment>
            {showLessFlag === true ? (
                // will show most recent comments below
                showMoreComments()
            ) : (
                <Fragment>
                    {/* filter based on first comment  */}
                    {filterComments.map((comment, i) => (
                        <div key={i}>
                            <CommentListContainer ref={ref} comment={comment} openModal={openModal} handleCloseModal={handleCloseModal} isBold={isBold} handleClickOpen={handleClickOpen} {...props} />
                        </div>
                    ))}
                </Fragment>
            )}
        </Grid>
    );
}

export default React.forwardRef(CommentList) as React.RefForwardingComponent<HTMLDivElement, any>;
