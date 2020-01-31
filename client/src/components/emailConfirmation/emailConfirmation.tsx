import React, { Fragment } from "react";
import GridHoc from "../hoc/grid";
export interface emailConfirmation {
    resendEmailConfirmationInit: () => void;
    location: any;
    user?: any;
}

function EmailConfirmation(props: emailConfirmation) {
    console.log(props.user);
    console.log(props.location);
    const emailMessage = props.user ? props.user : props.location.state.meta.message;
    return (
        <Fragment>
            <h3>{emailMessage}</h3>

            <span style={{ cursor: "pointer" }} onClick={() => props.resendEmailConfirmationInit()}>
                Resend Email Confirmation
            </span>
        </Fragment>
    );
}

export default GridHoc(EmailConfirmation);
