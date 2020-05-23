import React, { Fragment, useState } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./../commentItem/CommentItem";
import moment from "moment";
import OurLink from "../../../common/OurLink";
import OurSecondaryButton from "../../../common/OurSecondaryButton";
import OurModal from "../../../common/OurModal";
const ourStyle = {
    backgroundColor: "#FAFAFA",
    border: "1px solid #f2f2f2",
    borderRadius: "4px",
    padding: "15px 20px",
    margin: "15px",
};
function CommentList(props: any) {
    const [showMore, setShowMore] = useState<Number>(2);
    const [openModal, setOpenModal] = useState(false);
    const [showLessFlag, setShowLessFlag] = useState<Boolean>(false);
    const the_comments = props.comments.length;
    const inc = showMore as any;
    const showComments = (e) => {
        e.preventDefault();
        // if (inc + (1 % 2) === 0) {
        // }
        const oper = inc + 2;
        if (inc + 1 && inc <= the_comments) {
            setShowMore(inc + 1);
            setShowLessFlag(true);
        }
        if (oper % 2 === 0 && inc <= the_comments) {
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
    const showMoreComments = () => {
        return props.comments
            .filter((item, i) => item)
            .slice(0, showMore)
            .sort((a, b) => a.id - b.id)
            .map((comment, i) => (
                <div key={i}>
                    <List style={{ paddingBottom: "20px" }}>
                        <img alt="gravatar" style={{ margin: "-10px 15px" }} src={comment.author.gravatar} width="30" height="30" />
                        <Typography style={{ display: "inline-block", fontWeight: 700, padding: "5px 0px" }} variant="h6" align="left">
                            {Object.entries(props.currentUser).length === 0 ? (
                                <Fragment>
                                    <span style={{ cursor: "pointer", fontSize: "12px", fontWeight: isBold(comment) }} onClick={handleClickOpen}>
                                        {comment.author.username}
                                    </span>
                                    {comment.userId === props.userId && <span style={{ fontSize: "12px" }}> (OP)</span>}
                                    {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <OurLink
                                        style={{ fontSize: "12px", fontWeight: isBold(comment) }}
                                        to={{
                                            pathname: `/profile/${comment.author.username}`,
                                        }}
                                        title={comment.author.username}
                                    />
                                    {comment.userId === props.userId && <span style={{ fontSize: "12px" }}> (OP)</span>}
                                </Fragment>
                            )}
                        </Typography>
                        <div style={ourStyle}>
                            <CommentItem comment={comment} user={props.user} postId={props.postId} {...props} />
                            <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                                {moment(comment.createdAt).calendar()}
                            </Typography>
                        </div>
                    </List>
                </div>
            ));
    };

    console.log("dsfsfsf", Math.min(2, the_comments - inc));

    return (
        <Grid>
            <Fragment>
                <div style={{ margin: "30px 0px" }}>
                    {Math.min(2, the_comments - inc) !== -1 ? (
                        <Fragment>
                            {Math.min(2, the_comments - inc) !== 0 ? (
                                <OurSecondaryButton onClick={(e) => showComments(e)} component="span" color="secondary">
                                    View {Math.min(2, the_comments - inc) !== -1 ? Math.min(2, the_comments - inc) : 0} More Comments
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
                </div>
            </Fragment>
            {showLessFlag === true ? (
                // will show most recent comments below
                showMoreComments()
            ) : (
                <Fragment>
                    {/* filter based on first comment  */}
                    {props.comments
                        .filter((item, i) => item)
                        .slice(0, 2)
                        .sort((a, b) => b.id - a.id)
                        .map((comment, i) => (
                            <div key={i}>
                                <List style={{ paddingBottom: "20px" }}>
                                    <img alt="gravatar" style={{ margin: "-10px 15px" }} src={comment.author.gravatar} width="30" height="30" />
                                    <Typography style={{ display: "inline-block", fontWeight: 700, padding: "5px 0px" }} variant="h6" align="left">
                                        {Object.entries(props.currentUser).length === 0 ? (
                                            <Fragment>
                                                <span style={{ fontSize: "12px", cursor: "pointer", fontWeight: isBold(comment) }} onClick={handleClickOpen}>
                                                    {comment.author.username}
                                                    {comment.userId === props.userId && <span style={{ fontSize: "12px" }}> (OP)</span>}
                                                </span>

                                                {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                                            </Fragment>
                                        ) : (
                                            <Fragment>
                                                <OurLink
                                                    style={{ fontSize: "12px", fontWeight: isBold(comment) }}
                                                    to={{
                                                        pathname: `/profile/${comment.author.username}`,
                                                    }}
                                                    title={comment.author.username}
                                                />
                                                {comment.userId === props.userId && <span style={{ fontSize: "12px" }}> (OP)</span>}
                                            </Fragment>
                                        )}
                                    </Typography>

                                    <div style={ourStyle}>
                                        <CommentItem comment={comment} user={props.user} postId={props.postId} {...props} />
                                        <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                                            {moment(comment.createdAt).calendar()}
                                        </Typography>
                                    </div>
                                </List>
                            </div>
                        ))}
                </Fragment>
            )}
        </Grid>
    );
}
// prevents un-necesary re renders
export default React.memo(CommentList);
