import { connect } from "react-redux";
import { initLogin, loginInit } from "../actions/userActions";
import Login from "../components/login/login";
const mapDispatchToProps = (dispatch: any) => ({
  loginInit: (userData: object, history: object) => dispatch(loginInit(userData, history)),
  initLogin: () => dispatch(initLogin()),
});

const mapStateToProps = (state: any) => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
