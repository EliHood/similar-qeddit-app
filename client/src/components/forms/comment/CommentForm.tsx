import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import GifIcon from "@material-ui/icons/Gif";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import React, { Fragment, useState } from "react";
import GifSection from "./GifSection";

export interface commentProps {
    onSubmit: (e: any) => void;
    comment_body: string;
    commentChange: (e: any) => void;
    gifUrl: (e: any) => void;
    isGif: string;
}

export default function CommentForm(props: commentProps) {
    const [isGifSelected, setGifSelected] = useState(false);
    return (
        <Fragment>
            <form onSubmit={props.onSubmit}>
                {isGifSelected === false ? (
                    <Fragment>
                        <TextField
                            type="text"
                            style={{ borderRadius: "50%" }}
                            id="outlined-multiline-static"
                            label="Write A Comment"
                            multiline={true}
                            name="comment_body"
                            value={props.comment_body}
                            rows="3"
                            fullWidth={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment style={{ cursor: "pointer" }} position="start">
                                        <GifIcon onClick={() => setGifSelected(true)} />
                                    </InputAdornment>
                                ),
                            }}
                            margin="normal"
                            variant="outlined"
                            onChange={props.commentChange}
                        />
                        <br />
                        <br />
                        <Button disabled={props.comment_body.length > 6 ? false : true} type="submit" variant="outlined" color="primary">
                            Post A Comment
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <GifSection select={props.gifUrl} />
                        <Grid container={true} spacing={1} style={{ padding: "50px 0px" }}>
                            <Grid item={true} sm={1} lg={1}>
                                <TextFieldsIcon style={{ cursor: "pointer" }} onClick={() => setGifSelected(false)} />
                            </Grid>
                            <Grid item={true} sm={3} lg={3}>
                                <Button disabled={props.isGif !== "" ? false : true} size="small" type="submit" variant="outlined" color="primary">
                                    Post GIPHY
                                </Button>
                            </Grid>
                        </Grid>
                    </Fragment>
                )}
            </form>
        </Fragment>
    );
}
