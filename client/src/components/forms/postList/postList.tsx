import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import "react-toastify/dist/ReactToastify.css";
import PostItemContainer from "../PostItemContainer/PostItemContainer";
import storeHooks from "../../../common/storeHooks";
import OurLoader from "../../../common/OurLoader";

function PostList(props: any) {
    const { posts, currentUser } = props;
    return storeHooks().loading ? (
        <OurLoader />
    ) : (
        <Fragment>
            {posts.length > 0 ? (
                posts.map((post, i) => (
                    <div key={i} data-testid="post-list">
                        <PostItemContainer post={post} currentUser={currentUser} {...props} />
                    </div>
                ))
            ) : (
                <div data-testid="no-posts">
                    <Grid item={true} md={8}>
                        <Typography>No Posts yet</Typography>
                    </Grid>
                </div>
            )}
        </Fragment>
    );
}

export default React.memo(PostList);
