import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import GroupIcon from '@material-ui/icons/Group'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useSelector, useDispatch } from 'react-redux'
import { selectors, userActions } from '@mfe/redux-store'
import { useNavigate } from 'react-router-dom'
import { history } from '../../ourHistory'
import useInputChange from '../../hooks/useInputChangeHook'
import IsAuth from '../../hoc/isAuthenticated'
import SignUpForm from '../../molecules/SignUp'
import OurWrapper from '../../atoms/OurWrapper'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100%',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    error: {
        margin: '1em 0'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function RegisterPage(props: any) {
    const classes = useStyles()
    const userData = useSelector(selectors.userStore)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = (userInfo: object, navigate: any) =>
        dispatch(userActions.signUpInit(userInfo, navigate))
    const inputData = {
        addEmail: (email: string) => dispatch(userActions.addEmail(email)),
        addPassword: (password: string) =>
            dispatch(userActions.addPassword(password)),
        addUsername: (username: string) =>
            dispatch(userActions.addUsername(username)),
        addPasswordConf: (passwordConf: string) =>
            dispatch(userActions.addPasswordConf(passwordConf)),
    }
    const handleInputChange = useInputChange(inputData)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const { username, email, password } = userData
        const creds = {
            username,
            email,
            password,
        }

        signup(creds, navigate)
    }

    const {
        username,
        email,
        password,
        passwordConf,
        passwordConfError,
        usernameError,
        passwordError,
        emailError,
    } = userData
    const isEnabled = !(
        passwordConfError === true &&
        emailError === true &&
        passwordError === true &&
        usernameError === true
    )
    const isPasswordNonMatched =
        password !== passwordConf ? 'Password Don\'t Match' : false
    const { appBar, appBarShift, appOpen } = props
    return (
        <OurWrapper appBar={appBar} appOpen={appOpen} appBarShift={appBarShift}>
            <>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        className={classes.image}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <GroupIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>

                            <Grid
                                item
                                xs={8}
                                className={classes.error}
                            >
                                {userData.error ||
                                    (isPasswordNonMatched && (

                                        <Alert severity="warning">
                                            {userData.error ||
                                                isPasswordNonMatched}
                                        </Alert>

                                    ))}
                            </Grid>

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
            </>
        </OurWrapper >
    )
}

export default IsAuth(RegisterPage)
