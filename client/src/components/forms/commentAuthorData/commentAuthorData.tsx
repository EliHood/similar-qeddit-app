import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import OurLink from "../../../common/OurLink";
import OurModal from "../../../common/OurModal";
interface CommentAuthorDataInterface {
    comment: {
        author: {
            username: string;
            gravatar: string;
        };
        userId: number;
    };
    userId: number;
    isBold: any;
    openModal: () => void;
    handleCloseModal: () => void;
    handleClickOpen: () => void;
    currentUser: Object;
}
const CommentAuthorData = (props: CommentAuthorDataInterface) => {
    const { comment, isBold, currentUser, openModal, handleCloseModal, handleClickOpen } = props;
    const isReply = comment.commentReplies !== undefined ? "-10px 15px" : "-10px 0px";

    return (
        <Fragment>
            <img alt="gravatar" style={{ margin: isReply }} src={comment.author.gravatar} width="30" height="30" />
            <Typography style={{ display: "inline-block", margin: "10px 10px", fontWeight: 700, padding: "0px 0px" }} variant="h6" align="left">
                {Object.entries(currentUser).length === 0 ? (
                    <Fragment>
                        <span style={{ fontSize: "12px", margin: "0px", padding: "0px", cursor: "pointer", fontWeight: isBold(comment) }} onClick={handleClickOpen}>
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
        </Fragment>
    );
};
export default CommentAuthorData;
