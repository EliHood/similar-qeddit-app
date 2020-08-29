import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
type OurDate = {
    type: "post-date" | "comment-date" | "reply-date";
    createdAt: string;
};

const OurDate: React.FC<OurDate> = (props) => {
    const { type, createdAt } = props;
    return (
        <Fragment>
            {type === "post-date" && (
                <Typography variant="subtitle1" align="left">
                    {moment(createdAt).calendar()}
                </Typography>
            )}

            {type === "comment-date" && (
                <Typography id="date" style={{ fontSize: "12px" }} variant="caption" align="left">
                    {moment(createdAt).calendar()}
                </Typography>
            )}

            {type === "reply-date" && (
                <Typography style={{ fontSize: "12px" }} variant="caption" align="left">
                    {moment(createdAt).calendar()}
                </Typography>
            )}
        </Fragment>
    );
};

export default OurDate;
