import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
const PostList = (props: any) => {
  const { posts } = props;

  return posts.length > 0 ? (
    posts.map((post, i) => (
      <Fragment key={i}>
        <Grid item sm={12} md={12} style={{ margin: "20px 0px" }}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h3" align="left">
              {post.title}
            </Typography>
            <Typography align="left">{post.postContent}</Typography>

            <Typography variant="h6" align="left">
              {post.author.username}
            </Typography>

            <Typography align="right">Likes: {post.likeCounts}</Typography>
            <Typography align="right">{post.likedByMe}</Typography>
            <Typography variant="h6" align="left">
              {moment(post.created_at).calendar()}
            </Typography>
          </Paper>
        </Grid>
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
