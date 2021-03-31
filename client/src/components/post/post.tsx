import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostInit } from '../../actions/postActions';
import { profile } from '../../selectors/selectors';

function Post(props: any) {
    const dispatch = useDispatch();
    const postPage = useSelector(profile);
    const getPost = (id: number) => dispatch(fetchPostInit(id));
    React.useEffect(() => {
        const id = parseInt(props.match.params.id);
        getPost(id);
    }, []);

    const { title, postContent, author } = postPage;

    return (
        <>
            <Grid item sm={12} md={12} style={{ margin: '20px 0px', padding: '0px 200px' }}>
                <Grid item style={{ padding: '20px 0px' }}>
                    <Typography variant="h2" align="center">
                        {title}
                    </Typography>
                </Grid>
                <Grid item sm={12} md={12} style={{ padding: '40px 0px' }}>
                    <Typography style={{ lineHeight: '32px' }} variant="body1" align="left">
                        {postContent}
                    </Typography>
                </Grid>
                <Grid item sm={12} md={12} style={{ padding: '20px 0px' }}>
                    <Typography display="inline" variant="h6" align="left">
                        By:
                        {' '}
                        {author && author ? author.username : ''}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}
export default Post;
