import React, { RefForwardingComponent, useState, Fragment } from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ReplyIcon from "@material-ui/icons/Reply";
import CommentItem from "./../commentItem/CommentItem";
import ReplyForm from "../reply/ReplyForm";
import storeHooks from "../../../common/storeHooks";
import CommentAuthorData from "../commentAuthorData/commentAuthorData";
const ourStyle = {
    margin: "15px",
};
const CommentListContainer: RefForwardingComponent<HTMLDivElement, any> = (props, ref) => {
    const { comment, openModal, handleClickOpen, handleCloseModal, isBold } = props;
    const { replyComm } = storeHooks();
    const [replyComment, setReplyComment] = useState(false);
    const [addReply, setReply] = useState("");
    const replySubmit = (e) => {
        e.preventDefault();
        const data = {
            replyBody: addReply,
            userId: props.user.user.id,
            postId: props.postId,
            commentId: comment.id,
        };

        replyComm(data);
        // setReplyComment(false);
        setReply("");
    };
    return (
        <List innerRef={ref} style={{ paddingBottom: "20px" }} data-testid="comment-list-container">
            <CommentAuthorData {...props} comment={comment} openModal={openModal} handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} isBold={isBold} />

            {/* here you pass your ref */}
            <div style={ourStyle} data-testid="commentitem-wrapper">
                <CommentItem type="comment" comment={comment} user={props.user} postId={props.postId} {...props} />
                <Typography style={{ display: "inline-block", margin: "0px 0px", float: "right" }} align="left">
                    <span style={{ cursor: "pointer" }} onClick={() => setReplyComment(!replyComment)}>
                        <ReplyIcon style={{ margin: "-7px 0px" }} color="primary" /> <span>Reply</span>
                    </span>
                </Typography>

                {comment.commentReplies.length !== 0 ? (
                    <div style={{ marginLeft: "30px", padding: "20px" }}>
                        {comment.commentReplies.map((reply, i) => (
                            <Fragment>
                                <div key={i} style={{ padding: "5px" }}>
                                    <CommentAuthorData {...props} comment={reply} openModal={openModal} handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} isBold={isBold} />
                                    <CommentItem type="reply" reply={reply} user={props.user} postId={props.postId} {...props} />
                                </div>
                            </Fragment>
                        ))}
                        {replyComment && <ReplyForm onSubmit={(e) => replySubmit(e)} replyBody={addReply} replyChange={(e) => setReply(e.target.value)} />}
                    </div>
                ) : (
                    <div style={{ marginLeft: "30px", padding: "30px" }}>
                        {replyComment && <ReplyForm onSubmit={(e) => replySubmit(e)} replyBody={addReply} replyChange={(e) => setReply(e.target.value)} />}
                    </div>
                )}
            </div>
        </List>
    );
};

// you use forwardRef here
export default React.forwardRef(CommentListContainer);
