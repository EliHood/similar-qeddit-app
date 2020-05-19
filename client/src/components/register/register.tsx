import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import SignUpForm from "../forms/signUp/signUp";
import IsAuth from "../hoc/isAuthenticated";
import CssBaseline from "@material-ui/core/CssBaseline";
import useInputChange from "./../../common/handleHook";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import GroupIcon from "@material-ui/icons/Group";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { history } from "../../ourHistory";
import { useSelector, useDispatch } from "react-redux";
import { userStore } from "../../selectors/selectors";
import { addEmail, addPassword, addUsername, signUpInit, addPasswordConf } from "../../actions/userActions";
export interface registerState {
    passwordConf: string;
    passErr: string;
}
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100%",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function Register() {
    const classes = useStyles();
    const userData = useSelector(userStore());
    const dispatch = useDispatch();
    const signup = (userData: object, history: object) => dispatch(signUpInit(userData, history));
    const inputData = {
        addEmail: (email: string) => dispatch(addEmail(email)),
        addPassword: (password: string) => dispatch(addPassword(password)),
        addUsername: (username: string) => dispatch(addUsername(username)),
        addPasswordConf: (passwordConf: string) => dispatch(addPasswordConf(passwordConf)),
    };
    const handleInputChange = useInputChange(inputData);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { username, email, password } = userData;
        const creds = {
            username,
            email,
            password,
        };
        console.log(creds);
        signup(creds, history);
    };
    const { username, email, password, passwordConf, passwordConfError, usernameError, passwordError, emailError } = userData;
    const isEnabled = passwordConfError === true && emailError === true && passwordError === true && usernameError === true ? false : true;
    return (
        <Fragment>
            <Grid container={true} component="main" className={classes.root}>
                <CssBaseline />
                <Grid item={true} xs={false} sm={4} md={7} className={classes.image} />
                <Grid item={true} xs={12} sm={8} md={5} component={Paper} elevation={6} square={true}>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <GroupIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        {userData.error && <div>{userData.error}</div>}
                        <SignUpForm
                            submit={handleSubmit}
                            usernameChange={handleInputChange}
                            emailChange={handleInputChange}
                            passwordChange={handleInputChange}
                            passwordConfChange={handleInputChange}
                            username={username}
                            password={password}
                            passwordConf={passwordConf}
                            email={email}
                            usernameError={usernameError}
                            passwordError={passwordError}
                            passwordConfError={passwordConfError}
                            emailError={emailError}
                            disButton={isEnabled}
                        />
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
}

export default IsAuth(Register);
