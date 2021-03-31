import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import OurDate from '../../../common/Date';
import { CommentType } from '../../../utils/types';

const CommentBody = ({ comment: { gifUrl, comment_body, createdAt } }: CommentType) => (
    <>
        <div data-testid="comment-body">{gifUrl === '' && <ReactMarkdown className="markdownStyle" source={comment_body} />}</div>
        {gifUrl && <img style={{ width: '55%', clear: 'both', display: 'block' }} src={`${gifUrl}`} />}
        <OurDate type="comment-date" createdAt={createdAt} />
    </>
);

export default CommentBody;
