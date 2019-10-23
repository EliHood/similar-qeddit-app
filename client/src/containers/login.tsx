import { connect } from "react-redux";
import Login from "../components/login/login";
import { loginInit } from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
  loginInit: (userData: object) => dispatch(loginInit(userData))
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
