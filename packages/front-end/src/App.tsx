import React from 'react'
import jwt_decode from 'jwt-decode'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, selectors } from '@mfe/redux-store/src'
import setAuthToken from '@mfe/redux-store/src/utils/setAuthToken'
import { Routes } from './navigation'
import { store } from './bootstrap'
import { history } from './ourHistory'

const theme = createTheme({
    palette: {
        primary: {
            main: '#48A9A6',
        },
        secondary: {
            main: '#000000',
        },
    },
})

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#48A9A6',
        },
        secondary: {
            main: '#000000',
        },
    },
})
defaultTheme.typography.h6 = {
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
        fontSize: '0.5rem',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.4rem',
    },
}
defaultTheme.typography.h5 = {
    '@media (min-width:600px)': {
        fontSize: '0.9rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.4rem',
    },
}

const dark = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
        secondary: {
            main: '#000',
        },
    },
})

const App: React.FC = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(selectors.getDark)

    // userSession.userSession()
    if (localStorage.jwtToken) {
        // console.log("googletoken", localStorage.jwtToken);
        // Set auth token header auth
        setAuthToken(localStorage.jwtToken)
        // Decode token and get user info and exp
        const token: any = localStorage.getItem('jwtToken')

        if (token !== 'undefined') {
            const decoded: any = jwt_decode(token)

            // console.log(decoded);
            // Set user and isAuthenticated
            store.dispatch(userActions.loginSuccess(decoded))
            // store.dispatch(getCurrentUser());
            // this line of code may be unneccessary, because we are calling getUser from Nav component.
            // store.dispatch(getUser());
            // Check for expired token
            const currentTime = Date.now() / 1000

            if (decoded.iat > currentTime) {
                // Logout user
                store.dispatch(userActions.logOutInit(history))
                // Redirect to login
                localStorage.clear()
                window.location.href = '/login'
            }
        }
    }

    console.log('window', (window as any)?.runtimeConfig)
    return (
        <ThemeProvider theme={isDark ? defaultTheme : dark}>
            <Routes />
        </ThemeProvider>
    )
}

export default App
