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
const CommentListContainer = (props) => {
    const { comment, openModal, handleClickOpen, handleCloseModal, isBold } = props;
    return (
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
    );
};

export default CommentListContainer;
