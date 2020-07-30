import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import React, { Fragment, useState } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
export interface replyProps {
    onSubmit: (e: any) => void;
    replyBody: string;
    replyChange: (e: any) => void;
}

export default function ReplyForm(props: replyProps) {
    const [isGifSelected, setGifSelected] = useState<Boolean>(false);
    console.log("checking for reply component");
    return (
        <Fragment>
            <form onSubmit={props.onSubmit}>
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
                        value={props.replyBody}
                        rows={props.replyBody.length > 35 ? 3 : 1}
                        error={props.replyBody.length > 200 ? true : false}
                        fullWidth={true}
                        margin="normal"
                        variant="outlined"
                        onChange={props.replyChange}
                    />
                    {props.replyBody.length > 200 && (
                        <FormHelperText error={true} id="component-helper-text">
                            {"Comment must be less than 200 chars"}
                        </FormHelperText>
                    )}
                    <br />
                    <br />

                    <Button disabled={props.replyBody.length > 6 && props.replyBody.length <= 200 ? false : true} type="submit" variant="outlined" color="primary">
                        Reply
                    </Button>
                </Fragment>
            </form>
        </Fragment>
    );
}
