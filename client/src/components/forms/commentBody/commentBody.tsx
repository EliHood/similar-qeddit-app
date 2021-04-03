import React, { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import OurDate from '../../../common/Date'
import { CommentType } from '../../../utils/types'

const Img = styled.img`
    width: 55%;
    clear: both;
    display: block;
`

const CommentBody: React.FC<CommentType> = ({
    comment_body,
    gifUrl,
    createdAt,
}) => (
    <>
        <div data-testid="comment-body">
            {gifUrl === '' && (
                <ReactMarkdown
                    className="markdownStyle"
                    source={comment_body}
                />
            )}
        </div>
        {gifUrl && <Img src={`${gifUrl}`} />}
        <OurDate type="comment-date" createdAt={createdAt} />
    </>
)

export default CommentBody
