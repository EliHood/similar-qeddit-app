import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
import GridHoc from "../hoc/grid";

function EmailConfirmationSuccess(props) {
    console.log(props);
    const didMountRef = useRef();
    useEffect(() => {
        if (!didMountRef.current) {
            // didMountRef.current = true
            // console.log("email confirmation");
            props.emailConfirmationInit(props.match.params);
        } else {
            console.log("this is component didupdate");
        }
    }, [didMountRef]);
    console.log("testing email confirmation", props);
    return (
        <div>
            {props.user.includes("Thank you") ? (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {props.user} <a href="/login">Login</a>
                </Alert>
            ) : (
                <Alert severity="warning">
                    <AlertTitle>Error</AlertTitle>
                    {props.error}
                </Alert>
            )}
        </div>
    );
}

export default GridHoc(EmailConfirmationSuccess);
