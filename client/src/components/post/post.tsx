import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import LoginForm from "../forms/login/login";
import GridHoc from "../hoc/grid";
import Grid from "@material-ui/core/Grid";
import IsAuth from '../../components/hoc/isAuthenticated'
export interface PostProps {
    fetchPostInit: (event) => void;
    post: any
    match:any
}
export interface PostState {
    passwordConf: string;
    passErr: string;
}
  
class Post extends Component<PostProps, PostState>{
    componentDidMount(){
        const id = parseInt(this.props.match.params.id)
        this.props.fetchPostInit(id)
    }
    render(){
       const {title, postContent, author, createdAt} = this.props.post
        return(
            <Fragment>
                <Grid item sm={12} md={12} style={{ margin: "20px 0px", padding:"0px 200px" }}>
                    <Grid item style ={{ padding: "20px 0px"}}>
                        <Typography variant="h2" align="center">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item sm={12} md={12} style ={{ padding: "40px 0px"}}>
                        <Typography style={{ lineHeight: '32px'}} variant="body1" align="left">
                            {postContent}
                        </Typography>
                    </Grid>
                    <Grid item sm={12} md={12} style ={{ padding: "20px 0px"}}>
                        <Typography display="inline" variant="h6" align="left">
                            By: {author && author ? author.username : ''}
                        </Typography>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }
  
}
export default Post;
