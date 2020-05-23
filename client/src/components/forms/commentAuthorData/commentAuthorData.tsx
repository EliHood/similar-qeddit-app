import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import OurLink from "../../../common/OurLink";
import OurModal from "../../../common/OurModal";
const CommentAuthorData = (props: any) => {
    const { comment, isBold, openModal, handleCloseModal, handleClickOpen } = props;
    return (
        <Fragment>
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
        </Fragment>
    );
};
export default CommentAuthorData;
