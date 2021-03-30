import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import React, { Fragment } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import {ReplyPropsType} from '../../../utils/types';
export default function ReplyForm({onSubmit, replyChange, replyBody,}: ReplyPropsType) {
    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <Fragment>
                    <TextField
                        className="commentInput"
                        type="text"
                        style={{ borderRadius: "50%" }}
                        id="outlined-multiline-static"
                        label="Write A Reply"
                        multiline={true}
                        size={"medium"}
                        name="reply_body"
                        value={replyBody}
                        rows={replyBody.length > 35 ? 3 : 1}
                        error={replyBody.length > 200 ? true : false}
                        fullWidth={true}
                        margin="normal"
                        variant="outlined"
                        onChange={replyChange}
                    />
                    {replyBody.length > 200 && (
                        <FormHelperText error={true} id="component-helper-text">
                            {"Comment must be less than 200 chars"}
                        </FormHelperText>
                    )}
                    <br />
                    <br />

                    <Button disabled={replyBody.length > 6 && replyBody.length <= 200 ? false : true} type="submit" variant="outlined" color="primary">
                        Reply
                    </Button>
                </Fragment>
            </form>
        </Fragment>
    );
}
