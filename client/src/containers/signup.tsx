import { connect } from "react-redux";
import Register from "../components/register/register";
import { signUpInit } from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
  signUpInit: (userData: object) => dispatch(signUpInit(userData))
});

export default connect(
  null,
  mapDispatchToProps
)(Register);
