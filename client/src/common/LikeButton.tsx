import React, { Fragment } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import storehooks from "./storeHooks";
type LikeButtonProps = {
    type: "liked" | "unliked";
    likeCounts: number;
    postId?: number;
    dislike?: (id: number) => void;
    like?: (id: number) => void;
};

const LikeButton: React.FC<LikeButtonProps> = (props) => {
    return (
        <Fragment>
            {props.type === "liked" && (
                <Fragment>
                    <span style={{ cursor: "pointer" }} onClick={() => props.dislike?.(props.postId!)}>
                        <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                        <FavoriteIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                    </span>
                </Fragment>
            )}
            {props.type === "unliked" && (
                <Fragment>
                    <span onClick={() => props.like?.(props.postId!)}>
                        <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                        <FavoriteBorderIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                    </span>
                </Fragment>
            )}
        </Fragment>
    );
};

export default LikeButton;
