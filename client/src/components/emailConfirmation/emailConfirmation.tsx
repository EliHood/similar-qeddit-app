import React, { Fragment } from "react";
import GridHoc from "../hoc/grid";
import { useSelector, useDispatch } from "react-redux";
import { userConfirmation } from "../../selectors/selectors";
import { resendEmailConfirmationInit } from "../../actions/userActions";
export interface emailConfirmation {
    location: any;
    // user?: any;
}

function EmailConfirmation(props: emailConfirmation) {
    const dispatch = useDispatch();
    const user = useSelector(userConfirmation);
    const resendEmail = () => dispatch(resendEmailConfirmationInit());
    const emailMessage = user ? user : props.location.state.meta.message;

    return (
        <Fragment>
            <h3>{emailMessage}</h3>

            <span style={{ cursor: "pointer" }} onClick={() => resendEmail()}>
                Resend Email Confirmation
            </span>
        </Fragment>
    );
}

export default GridHoc(EmailConfirmation);
