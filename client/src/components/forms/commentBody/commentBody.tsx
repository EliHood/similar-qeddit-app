import React, { Fragment } from "react";
import OurDate from "../../../common/Date";
import ReactMarkdown from "react-markdown";

type CommentType = {
    comment: {
        gifUrl: string;
        comment_body: string;
        createdAt: string;
    };
};

const CommentBody: React.FC<CommentType> = (props) => {
    const { comment } = props;
    return (
        <Fragment>
            <div data-testid="comment-body">{comment.gifUrl === "" && <ReactMarkdown className="markdownStyle" source={comment.comment_body} />}</div>

            {comment.gifUrl && <img style={{ width: "55%", clear: "both", display: "block" }} src={`${comment.gifUrl}`} />}

            <OurDate type="comment-date" createdAt={comment.createdAt} />
        </Fragment>
    );
};

export default CommentBody;
