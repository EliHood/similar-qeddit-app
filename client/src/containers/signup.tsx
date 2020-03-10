import { connect } from "react-redux";
import { addEmail, addPassword, addUsername, signUpInit, addPasswordConf } from "../actions/userActions";
import Register from "../components/register/register";
const mapDispatchToProps = (dispatch: any) => ({
    signUpInit: (userData: object, history: object) => dispatch(signUpInit(userData, history)),
    addEmail: (email: string) => dispatch(addEmail(email)),
    addPassword: (password: string) => dispatch(addPassword(password)),
    addUsername: (username: string) => dispatch(addUsername(username)),
    addPasswordConf: (passwordConf: string) => dispatch(addPasswordConf(passwordConf)),
});
const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
