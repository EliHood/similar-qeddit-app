import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import React, { useState, useEffect } from 'react'
import { userActions } from '@mfe/redux-store/src'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import storeHooks from '../../hooks/useStoreHooks'
import { history } from '../../ourHistory'
import LoginForm from '../../molecules/Login'
import IsAuth from '../../hoc/isAuthenticated'
import GoogleLoginButton from '../../atoms/GoogleButton'
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
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function Login() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const login = (userData: object, historyData: object) =>
        dispatch(userActions.loginInit(userData, historyData))
    const { userErr, isAuthenticated, isGoogleAccount } = storeHooks()

    useEffect(() => {
        if (isAuthenticated || isGoogleAccount) {
            navigate('/dashboard')
        }
    }, [isAuthenticated, isGoogleAccount])

    const goBackEmailConfirmation = () => {
        history.goBack()
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const creds = {
            username,
            password,
        }
        login(creds, history)
    }

    return (
        <OurWrapper>
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
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Log In
                            </Typography>
                            {userErr && (
                                <div>
                                    <Alert severity="warning">{userErr}</Alert>
                                </div>
                            )}
                            {userErr.includes('Please activate') && (
                                <div style={{ padding: '20px 0px' }}>
                                    <Typography
                                        variant="h6"
                                        style={{ cursor: 'pointer' }}
                                        onClick={goBackEmailConfirmation}
                                    >
                                        {' '}
                                        Back{' '}
                                    </Typography>
                                </div>
                            )}

                            <LoginForm
                                submit={handleSubmit}
                                username={username}
                                password={password}
                                usernameChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                passwordChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                            <div style={{ margin: '60px 0px' }}>
                                <GoogleLoginButton />
                            </div>
                        </div>
                    </Grid>
                </Grid>

                {/* </div> */}
            </>
        </OurWrapper>
    )
}

export default IsAuth(Login)
