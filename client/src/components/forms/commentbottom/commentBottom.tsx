import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CommentForm from '../comment/CommentForm';
import CommentList from '../commentList/CommentList';
import AuthButtons from '../../../common/AuthButtons';
import { CommentBottomType } from '../../../utils/types';

const CommentBottom: React.FC<CommentBottomType> = ({
    post: { Comments, userId, id }, currentUser, deleteComment, postComment,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [comment_body, setCommentBody] = useState('');
    const [gifUrl, setGifUrl] = useState('');
    const [mentionedUser, setMentionedUser] = useState(false);
    const divRef = React.useRef<any>();
    const writeComment = React.useCallback(() => {
    // this is the same as this.setState({ openForm: !this.state.open })
        setOpenForm(!openForm);
    }, [setOpenForm, openForm]);
    const commentChange = React.useCallback(
        (comment) => {
            setCommentBody(comment);
            const regex = /^@/i; // checks for the first character is @
            // const regexTwitter = /\B@[a-z0-9_-]+/gi;
            const words = comment.split(' ');

            if (words.length === 0) {
                setMentionedUser(false);
            }

            for (let i = 0; i < words.length; i++) {
                const letter = words[i];

                if (regex.test(letter)) {
                    setMentionedUser(true);
                } else {
                    setMentionedUser(false);
                }
            }

            setGifUrl('');
        },
        [setMentionedUser, setGifUrl],
    );
    const selectGif = React.useCallback(
        (e) => {
            setGifUrl(e.images.downsized_large.url);
            setCommentBody('');
            // you wont be able to add text comment with a gif, it will look weird :(
        },
        [setGifUrl, setCommentBody],
    );
    const handleClickOpen = React.useCallback(() => {
        setOpenModal(true);
    }, [setOpenModal]);
    const handleCloseModal = React.useCallback(() => {
        setOpenModal(false);
    }, [setOpenModal]);
    const commentSubmit = React.useCallback(
        (e: any, id: number) => {
            e.preventDefault();
            const formData = {
                comment_body,
                id,
                gifUrl,
            };
            postComment(formData);
            setCommentBody('');
            setOpenForm(false);

            // divRef.current.scrollIntoView({ behavior: "smooth" });
            // my attempt to scroll to the lastest comment.
            setTimeout(() => {
                divRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
            }, 1200);
        },
        [setCommentBody, setOpenForm, comment_body, gifUrl],
    );
    const commentsView = (
        <>
            <span style={{ margin: '15px 0px', fontSize: '14px' }}>
                {' '}
                (
                {Comments.length}
                )
                {' '}
            </span>
            <Typography style={{ fontWeight: 500, margin: '10px 0px', fontSize: '12px' }} variant="caption">
                Comments
            </Typography>
            <CommentList ref={divRef} user={currentUser} deleteComment={deleteComment} userId={userId} postId={id} comments={Comments} />

            {/*  if show more hide show more button and show show less comments button */}
        </>
    );
    const commentForm = openForm ? (
        <CommentForm
            commentChange={(e: any) => commentChange(e.target.value)}
            comment_body={comment_body}
            onSubmit={(e) => commentSubmit(e, id)}
            gifUrl={selectGif}
            isGif={gifUrl}
            mentionedUser={mentionedUser}
            setMentionedUser={setMentionedUser}
            setCommentBody={setCommentBody}
            currentUser={currentUser.user}
        />
    ) : null;

    return (
        <Grid item sm={12} lg={12} style={{ paddingTop: '40px' }}>
            {Comments.length === 0 ? <div ref={divRef} /> : null}

            {Comments.length > 0 ? (
                commentsView
            ) : (
                <Grid item sm={12} lg={12} style={{ padding: '30px 0px' }}>
                    <Typography>No Commments Yet</Typography>
                </Grid>
            )}
            <AuthButtons currentUser={currentUser} writeComment={writeComment} openForm={openForm} handleClickOpen={handleClickOpen} handleCloseModal={handleCloseModal} openModal={openModal} />
            {commentForm}
        </Grid>
    );
};

export default CommentBottom;
