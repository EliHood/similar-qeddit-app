import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import ButtonFunction from "./ButtonFunction";
import LikeButton from "./LikeButton";
import OurModal from "./OurModal";
import { Button } from "@material-ui/core";
import storehooks from "./storeHooks";
type AuthButtonType = {
    type: "post-buttons" | "comment-buttons" | "post-buttons-modal";
    user?: {
        user: {
            id: number;
        };
    };
    comment?: {
        userId: number;
        id: number;
        gifUrl: String;
    };
    postId?: number;
    post?: {
        id: number;
        likeCounts: number;
        likedByMe: Boolean;
    };
    handleClickOpen?: () => void;
    onReply?: () => void;
    setEditComment?: (e: any) => void;
    currentUser?: Object;
    openModal?: boolean;
    handleCloseModal?: () => void;
    writeComment?: () => void;
    openForm?: Boolean;
};

const AuthButtons: React.FC<AuthButtonType> = (props) => {
    const { postId, currentUser, writeComment, openForm, openModal, handleCloseModal, handleClickOpen, post, type, comment, user, onReply, setEditComment } = props;
    const { likePost, dislikePost } = storehooks();
    const memoizedLike = React.useCallback((id) => likePost(id), [likePost]);
    const memoizedDislike = React.useCallback((id) => dislikePost(id), [dislikePost]);
    return (
        <Fragment>
            {type === "comment-buttons" &&
                (Object.entries(user!).length !== 0 ? (
                    <Fragment>
                        {user && user.user && comment!.userId === user.user.id ? (
                            <Typography style={{ display: "inline-block", float: "right" }} align="right">
                                <ButtonFunction type="delete" comment={comment} userId={comment!.userId} postId={postId} commentId={comment!.id} />
                            </Typography>
                        ) : null}
                        <Typography style={{ display: "inline-block", float: "right" }} align="right">
                            <ButtonFunction type="reply" onReply={onReply} />
                        </Typography>
                        {/* hide edit button if gifUrl */}
                        {!comment!.gifUrl && comment!.userId === user!.user.id ? (
                            <Fragment>
                                <Typography style={{ display: "inline-block", margin: "0px 20px", float: "right" }} align="left">
                                    <ButtonFunction type="edit" setEditComment={setEditComment} />
                                </Typography>
                            </Fragment>
                        ) : null}
                    </Fragment>
                ) : null)}

            {type === "post-buttons" &&
                (Object.entries(currentUser!).length === 0 ? (
                    <Fragment>
                        <span onClick={handleClickOpen}>
                            <LikeButton like={memoizedLike} type="unliked" likeCounts={post!.likeCounts} />
                        </span>
                        {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                    </Fragment>
                ) : (
                    <Fragment>
                        {post!.likedByMe === true ? (
                            <LikeButton postId={post!.id} dislike={memoizedDislike} type="liked" likeCounts={post!.likeCounts} />
                        ) : (
                            <LikeButton postId={post!.id} like={memoizedLike} type="unliked" likeCounts={post!.likeCounts} />
                        )}
                    </Fragment>
                ))}

            {type === "post-buttons-modal" &&
                (Object.entries(currentUser!).length === 0 ? (
                    <Fragment>
                        <Button onClick={handleClickOpen} variant="outlined" component="span" color="primary">
                            {"Write A Comment"}
                        </Button>
                        {openModal ? <OurModal open={openModal} handleClose={handleCloseModal} /> : null}
                    </Fragment>
                ) : (
                    <Fragment>
                        <Button onClick={writeComment} variant="outlined" component="span" color="primary">
                            {openForm! ? "Close" : "Write A Comment"}
                        </Button>
                    </Fragment>
                ))}
        </Fragment>
    );
};

export default AuthButtons;
