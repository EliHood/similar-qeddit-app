import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./../commentItem/CommentItem";
import moment from "moment";
import OurLink from "../../common/OurLink";
import React, { Fragment, useState } from "react";
import OurSecondaryButton from "../../common/OurSecondaryButton";
import OurModal from "../../common/OurModal";
const ourStyle = {
    backgroundColor: "#FAFAFA",
    border: "1px solid #f2f2f2",
    borderRadius: "4px",
    padding: "15px 20px",
};
function CommentList(props: any) {
    const [showMore, setShowMore] = useState<Number>(3);
    const [openModal, setOpenModal] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [showLessFlag, setShowLessFlag] = useState<Boolean>(false);
    const showComments = (e) => {
        e.preventDefault();
        setShowMore(12);
        setShowLessFlag(true);
    };
    const handleClickOpen = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        console.log("testtt");
        setOpenModal(false);
    };
    const showLessComments = (e) => {
        e.preventDefault();
        setShowMore(3);
        setShowLessFlag(false);
    };
    const showMoreComments = () => {
        console.log("this got called");
        return props.comments
            .slice(0)
            .sort((a, b) => a.id - b.id)
            .map((comment, i) => (
                <div key={i}>
                    <List style={{ paddingBottom: "20px" }}>
                        <Typography style={{ display: "block", fontWeight: 700, padding: "5px 0px" }} variant="h6" align="left">
                            {Object.entries(props.currentUser).length === 0 ? (
                                <Fragment>
                                    <span style={{ cursor: "pointer" }} onClick={handleClickOpen}>
                                        {comment.author.username}
                                    </span>
                                    {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                                </Fragment>
                            ) : (
                                <OurLink
                                    to={{
                                        pathname: `/profile/${comment.author.username}`,
                                    }}
                                    title={comment.author.username}
                                />
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

    return (
        <Grid>
            <Fragment>
                <div style={{ margin: "30px 0px" }}>
                    {props.comments.length > 3 && showLessFlag === false ? (
                        <OurSecondaryButton onClick={(e) => showComments(e)} component="span" color="secondary">
                            View older Comments
                        </OurSecondaryButton>
                    ) : (
                        <Fragment>
                            {props.comments.length > 3 && (
                                <OurSecondaryButton onClick={(e) => showLessComments(e)} component="span" color="secondary">
                                    Show Less Comments
                                </OurSecondaryButton>
                            )}
                        </Fragment>
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
                        .sort((a, b) => b.id - a.id)
                        .slice(0, 3)
                        .map((comment, i) => (
                            <div key={i}>
                                <List style={{ paddingBottom: "20px" }}>
                                    <Typography style={{ display: "block", fontWeight: 700, padding: "5px 0px" }} variant="h6" align="left">
                                        {Object.entries(props.currentUser).length === 0 ? (
                                            <Fragment>
                                                <span style={{ cursor: "pointer" }} onClick={handleClickOpen}>
                                                    {comment.author.username}
                                                </span>
                                                {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                                            </Fragment>
                                        ) : (
                                            <OurLink
                                                to={{
                                                    pathname: `/profile/${comment.author.username}`,
                                                }}
                                                title={comment.author.username}
                                            />
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
