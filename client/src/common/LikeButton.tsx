import React, { Fragment } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import storehooks from "./storeHooks";
type LikeButtonProps = {
    type: "liked" | "unliked";
    likeCounts: number;
    postId?: number;
};

const LikeButton: React.FC<LikeButtonProps> = (props) => {
    const { likePost, dislikePost } = storehooks();
    const memoizedLike = React.useCallback((id) => likePost(id), [likePost]);
    const memoizedDislike = React.useCallback((id) => dislikePost(id), [dislikePost]);
    return (
        <Fragment>
            {props.type === "liked" && (
                <Fragment>
                    <span style={{ cursor: "pointer" }} onClick={() => memoizedDislike(props.postId!)}>
                        <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                        <FavoriteIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                    </span>
                </Fragment>
            )}
            {props.type === "unliked" && (
                <Fragment>
                    <span onClick={() => memoizedLike(props.postId!)}>
                        <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                        <FavoriteBorderIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                    </span>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LikeButton;
