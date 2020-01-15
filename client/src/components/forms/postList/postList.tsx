import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import moment from "moment";
import React, { Fragment } from "react";
import OurLink from "../../common/OurLink";
const PostList = (props: any) => {
  const { posts, currentUser} = props;
  return posts.length > 0 ? (
    posts.map((post, i) => (
      <Fragment key={i}>
        <Grid item={true} sm={12} md={12} style={{ margin: "20px 0px" }}>
          <Paper style={{ padding: "20px" }}>
            <Typography variant="h5" align="left">
                <OurLink to={{
                    pathname: `/post/${post.id}`,
                    state: { post },
                  }}
                  title={post.title}
                />
            </Typography>
            <Grid item={true} sm={12} md={12} style={{ padding: "30px 0px"}} >
              <Typography align="left">{post.postContent.slice(0, 30)}</Typography>
            </Grid>
            <Avatar
              style={{
                display: "inline-block",
                margin: "-10px -20px",
                padding: "0px 30px 0px 20px",
              }}
              sizes="small"
              src={post.author.gravatar}
            />
            <Typography display="inline" variant="subtitle1" align="left">
                {post.author.username}
            </Typography>

            <Typography align="right">Likes: {post.likeCounts}</Typography>
            {/* <span
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
            </div> */}
             <Grid container spacing={1} style={{ padding: "20px 0px"}}>
              <Grid item={true} sm={10} lg={10} md={10} style={{ padding: "0px 0px"}}>
                <Typography align="left">
                    {currentUser && currentUser.user && post.userId === currentUser.user.id ? (
                      <span style={{cursor: "pointer"}} onClick ={ () => props.deletePost(post.id)}>
                        <DeleteOutlineOutlinedIcon style={{ margin: "-5px 0px"}} color="primary" /> <span>Delete</span>
                      </span>
                    ):(
                      null
                    )}
                  </Typography>
                </Grid>
            <Grid item={true} sm={2} lg={2} style={{ padding: "0px 15px"}}>
              <Typography align="right">
                  {post.likedByMe === true ? (
                    <span style={{ cursor: "pointer"}} onClick={() => props.dislikePost(post.id)}>
                      <FavoriteIcon style={{ color: "red" }}/>
                    </span>
                  ) : (
                    <span onClick={() => props.likePost(post.id)}>
                    <FavoriteBorderIcon
                      style={{ color: "red",  cursor: "pointer"  }}
                    />
                    </span>
                  )}
                </Typography>
                </Grid>
             </Grid>

            <Typography variant="h6" align="left">
              {moment(post.createdAt).calendar()}
            </Typography>
          </Paper>
        </Grid>
      </Fragment>
    ))
  ) : (
    <div>
      <Grid item={true} md={8}>
        <Typography>No Posts yet</Typography>
      </Grid>
    </div>
  );
};

export default PostList;
