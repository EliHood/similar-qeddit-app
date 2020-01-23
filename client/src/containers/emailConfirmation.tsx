import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EmailConfirmation from "../components/emailConfirmation/emailConfirmation";
import { userConfirmation } from "./../selectors/selectors";
import { resendEmailConfirmationInit } from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
    resendEmailConfirmationInit: () => dispatch(resendEmailConfirmationInit())
});

const mapStateToProps = createStructuredSelector({
    user: userConfirmation()
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EmailConfirmation);
