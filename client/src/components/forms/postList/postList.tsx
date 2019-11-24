import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
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
            <Avatar
              style={{
                display: "inline-block",
                margin: "-5px 0px"
              }}
              sizes="small"
              src={post.author.gravatar}
            />
            <Typography display="inline" variant="h6" align="left">
              {post.author.username}
            </Typography>

            <Typography align="right">Likes: {post.likeCounts}</Typography>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => props.likePost(post.id)}
            >
              {" "}
              Like this post
            </span>
            <div style={{ margin: "20px 0px", cursor: "pointer" }}>
              <span onClick={() => props.dislikePost(post.id)}>
                Dislike this post
              </span>
            </div>
            <Typography align="right">
              {post.likedByMe === true ? (
                <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
              ) : (
                <FavoriteBorderIcon
                  style={{ color: "red" }}
                ></FavoriteBorderIcon>
              )}
            </Typography>
            <Typography variant="h6" align="left">
              {moment(post.createdAt).calendar()}
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
