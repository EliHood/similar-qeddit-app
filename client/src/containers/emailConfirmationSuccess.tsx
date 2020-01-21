import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EmailConfirmationSuccess from "../components/emailConfirmationSuccess/emailConfirmationSuccess";
import { userConfirmation, userError } from "./../selectors/selectors";
import { emailConfirmationInit } from './../actions/userActions'
const mapDispatchToProps = (dispatch: any) => ({
    emailConfirmationInit: (payload: object) => dispatch(emailConfirmationInit(payload))
});
const mapStateToProps = createStructuredSelector({
    user: userConfirmation(),
    error: userError()
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EmailConfirmationSuccess);
