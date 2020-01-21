import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EmailConfirmationSuccess from "../components/emailConfirmationSuccess/emailConfirmationSuccess";
import { userConfirmation } from "./../selectors/selectors";
import { emailConfirmationInit } from './../actions/userActions'
const mapDispatchToProps = (dispatch: any) => ({
    emailConfirmationInit: (payload: object) => dispatch(emailConfirmationInit(payload))
});
const mapStateToProps = createStructuredSelector({
    user: userConfirmation()
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EmailConfirmationSuccess);
