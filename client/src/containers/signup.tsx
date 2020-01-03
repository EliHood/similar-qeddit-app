import { connect } from "react-redux";
import Register from "../components/register/register";
import { signUpInit, addEmail, addPassword, addUsername} from "../actions/userActions";
const mapDispatchToProps = (dispatch: any) => ({
  signUpInit: (userData: object) => dispatch(signUpInit(userData)),
  addEmail: (email:string) => dispatch(addEmail(email)),
  addPassword: (password: string) => dispatch(addPassword(password)),
  addUsername: (username: string) => dispatch(addUsername(username))

});
const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
