import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
const PostList = (props: any) => {
  const { posts } = props;

  return posts.length > 0 ? (
    posts.map((post, i) => (
      <Fragment key={i}>
        <Typography>{post.title}</Typography>
      </Fragment>
    ))
  ) : (
    <div>
      <Grid item md={8}>
        <Typography>No Posts yet</Typography>
      </Grid>
    </div>
  );
};

export default PostList;
