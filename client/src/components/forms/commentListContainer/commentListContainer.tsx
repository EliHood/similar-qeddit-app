import React, { RefForwardingComponent } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./../commentItem/CommentItem";
import moment from "moment";
import CommentAuthorData from "../commentAuthorData/commentAuthorData";
const ourStyle = {
    margin: "15px",
};
const CommentListContainer: RefForwardingComponent<HTMLDivElement, any> = (props, ref) => {
    const { comment, openModal, handleClickOpen, handleCloseModal, isBold } = props;
    return (
        <List innerRef={ref} style={{ paddingBottom: "20px" }} data-testid="comment-list-container">
            <CommentAuthorData {...props} comment={comment} openModal={openModal} handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} isBold={isBold} />

            {/* here you pass your ref */}
            <div style={ourStyle} data-testid="commentitem-wrapper">
                <CommentItem comment={comment} user={props.user} postId={props.postId} {...props} />
                <Typography style={{ fontSize: "12px" }} variant="body1" align="left">
                    {moment(comment.createdAt).calendar()}
                </Typography>
            </div>
        </List>
    );
};

// you use forwardRef here
export default React.forwardRef(CommentListContainer);
