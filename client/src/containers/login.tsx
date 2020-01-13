import { connect } from "react-redux";
import { initLogin, loginInit } from "../actions/userActions";
import Login from "../components/login/login";
const mapDispatchToProps = (dispatch: any) => ({
  loginInit: (userData: object) => dispatch(loginInit(userData)),
  initLogin: () => dispatch(initLogin()),
});

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
