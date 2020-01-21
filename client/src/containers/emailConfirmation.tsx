import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import EmailConfirmation from "../components/emailConfirmation/emailConfirmation";
import { userConfirmation } from "./../selectors/selectors";
const mapStateToProps = createStructuredSelector({
    user: userConfirmation()
});
export default connect(
    mapStateToProps,
    null,
)(EmailConfirmation);
