import { connect } from "react-redux";
import Register from "../components/register/register";
import { signUpInit } from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
  signUpInit: (userData: object) => dispatch(signUpInit(userData))
});
const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
