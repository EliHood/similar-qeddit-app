import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import OurLink from "./OurLink";
export default function OurModal(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Dialog fullScreen={fullScreen} open={props.open} onClose={props.handleClose} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">{"You have to be signed in to do that"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <OurLink
                        style={{ color: "#333" }}
                        to={{
                            pathname: `/login`,
                        }}
                        title={"Sign In"}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus={true} onClick={props.handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
