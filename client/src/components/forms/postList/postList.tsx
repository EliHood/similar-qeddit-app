import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "react-toastify/dist/ReactToastify.css";
import PostItemContainer from "../PostItemContainer/PostItemContainer";
function PostList(props: any) {
    // useEffect(() => {
    //     if (!didMountRef.current) {
    //         props.getNotifications();
    //     } else {
    //         console.log("test");
    //     }
    // });
    const { posts, currentUser } = props;
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
