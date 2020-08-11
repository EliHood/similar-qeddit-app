import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useRef } from "react";
import GridHoc from "../hoc/grid";
import { useDispatch, useSelector } from "react-redux";
import { userConfirmation, userError } from "../../selectors/selectors";
import { emailConfirmationInit } from "../../actions/userActions";

function EmailConfirmationSuccess(props) {
    console.log(props);
    const didMountRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector(userConfirmation);
    const error = useSelector(userError);
    const emailConfirmation = (payload: object) => dispatch(emailConfirmationInit(payload));
    useEffect(() => {
        if (!didMountRef.current) {
            // didMountRef.current = true
            // console.log("email confirmation");
            emailConfirmation(props.match.params);
        } else {
            console.log("this is component didupdate");
        }
    }, [didMountRef]);

    return (
        <div data-testid="message">
            {user.includes("Thank you") ? (
                <div data-testid="success-message">
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {user} <a href="/login">Login</a>
                    </Alert>
                </div>
            ) : (
                <div data-testid="error-message">
                    <Alert severity="warning">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                </div>
            )}
        </div>
    );
}

export default GridHoc(EmailConfirmationSuccess);
