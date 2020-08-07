import React, { Fragment } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
type LikeButtonProps = {
    type: "liked" | "unliked";
    likeCounts: number;
};

const LikeButton: React.FC<LikeButtonProps> = (props) => {
    return (
        <Fragment>
            {props.type === "liked" && (
                <Fragment>
                    <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                    <FavoriteIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                </Fragment>
            )}
            {props.type === "unliked" && (
                <Fragment>
                    <span style={{ padding: "12px" }}>Likes {props.likeCounts}</span>
                    <FavoriteBorderIcon style={{ color: "red", cursor: "pointer", margin: "-7px" }} />
                </Fragment>
            )}
        </Fragment>
    );
};

export default LikeButton;
