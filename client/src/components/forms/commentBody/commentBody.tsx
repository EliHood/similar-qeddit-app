import React, { Fragment } from "react";
import OurDate from "../../../common/Date";
import ReactMarkdown from "react-markdown";
import {CommentType} from '../../../utils/types'

const CommentBody = ({ comment: { gifUrl, comment_body, createdAt } }: CommentType) => {
    return (
        <Fragment>
            <div data-testid="comment-body">{gifUrl === "" && <ReactMarkdown className="markdownStyle" source={comment_body} />}</div>
            {gifUrl && <img style={{ width: "55%", clear: "both", display: "block" }} src={`${gifUrl}`} />}
            <OurDate type="comment-date" createdAt={createdAt} />
        </Fragment>
    );
};

export default CommentBody;
