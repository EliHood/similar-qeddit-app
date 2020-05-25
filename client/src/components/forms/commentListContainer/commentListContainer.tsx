import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./../commentItem/CommentItem";
import moment from "moment";
import CommentAuthorData from "../commentAuthorData/commentAuthorData";
const ourStyle = {
    margin: "15px",
};
const CommentListContainer = (props) => {
    const { comment, openModal, handleClickOpen, handleCloseModal, isBold } = props;
    return (
        <List style={{ paddingBottom: "20px" }}>
            <CommentAuthorData {...props} comment={comment} openModal={openModal} handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} isBold={isBold} />

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
