import React, { Fragment, useEffect, useRef, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurLink from "../../common/OurLink";
import CommentForm from "../../forms/comment/CommentForm";
import CommentList from "../../forms/commentList/CommentList";
import OurModal from "../../common/OurModal";
import PostItemContainer from "../PostItemContainer/PostItemContainer";
function PostList(props: any) {
    const [openModal, setOpenModal] = useState(false);
    const [isComment, setIsComment] = useState(false);
    const [comment_body, setCommentBody] = useState("");
    const [gifUrl, setGifUrl] = useState("");

    const didMountRef = useRef();
    useEffect(() => {
        if (!didMountRef.current) {
            props.getNotifications();
        } else {
            console.log("test");
        }
    });
    const { posts, currentUser } = props;
    // console.log(currentUser);
    console.log(isComment);
    return posts.length > 0 ? (
        posts.map((post, i) => (
            <Fragment key={i}>
                <PostItemContainer post={post} currentUser={currentUser} {...props} />
            </Fragment>
        ))
    ) : (
        <div>
            <Grid item={true} md={8}>
                <Typography>No Posts yet</Typography>
            </Grid>
        </div>
    );
}

export default React.memo(PostList);
