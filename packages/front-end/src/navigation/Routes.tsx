import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import { userActions } from '@mfe/redux-store'
import Landing from '../pages/LandingPage'
import Dashboard from '../pages/DashboardPage'
import EmailConfirmation from '../molecules/EmailConfirmation'
import EmailConfirmationSuccess from '../molecules/EmailConfirmationSuccess'
import Likes from '../pages/LikesPage'
import Login from '../pages/LoginPage'
import Post from '../pages/PostPage'
import EditProfile from '../pages/EditProfilePage'
import Profile from '../pages/ProfilePage'
import Register from '../pages/RegisterPage'
import { history } from '../ourHistory'
import PrivateRoute from './PrivateRoute'
import NotFound from '../molecules/404'
import CollapasedMenu from '../organisms/CollapsedMenu'
import MainNav from '../organisms/MainNav'
import useWrapperSlide from '../hooks/useWrapperSlide'
import Search from '../molecules/Search'
import UserPosts from '../pages/UserPostsPage'
import storeHooks from '../hooks/useStoreHooks'
import SearchResults from '../molecules/SearchResults'
import SearchResultPage from '../pages/SearchResultPage'

function Routes() {
    const dispatch = useDispatch()
    const { user } = storeHooks()
    const logOut = () => dispatch(userActions.logOutInit(history))
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )

    const { classes, appOpen, appSetOpen } = useWrapperSlide()

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const handleNotificationClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget)
        dispatch(userActions.initGetNotifications(user.id))
    }

    const handleClose = React.useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])

    return (
        <Router history={history}>
            <AppBar
                position="static"
                className={classnames(
                    (classes.appBar,
                    {
                        [classes.appBarShift]: appOpen,
                    })
                )}
            >
                <Toolbar style={{ height: '1px' }}>
                    <Grid item lg={2} style={{ flex: 1 }}>
                        <Typography
                            style={{ color: '#fff' }}
                            variant="subtitle1"
                            color="secondary"
                        >
                            TypeScript React
                        </Typography>
                    </Grid>
                    <Grid item lg={8} style={{ flex: 1 }}>
                        <Search />
                        <SearchResults />
                    </Grid>

                    <CollapasedMenu
                        handleClose={handleClose}
                        setOpen={appSetOpen}
                        appOpen={appOpen}
                        handleNotificationClick={handleNotificationClick}
                        logOut={logOut}
                        darkTheme={() => dispatch(userActions.setDark())}
                        isAuthenticated={user?.isAuthenticated}
                        googleAccount={user?.googleAccount}
                        open={open}
                        anchorEl={anchorEl}
                        notificationId={id}
                    />
                    <MainNav
                        darkTheme={() => dispatch(userActions.setDark())}
                        logOut={logOut}
                        handleClose={handleClose}
                        open={open}
                        notificationId={id}
                        anchorEl={anchorEl}
                        handleNotificationClick={handleNotificationClick}
                        isAuthenticated={user?.isAuthenticated}
                        googleAccount={user?.googleAccount}
                    />
                </Toolbar>
            </AppBar>

            <Switch>
                <Route exact path="/" render={() => <Landing />} />
                <Route
                    path="/login"
                    render={() =>
                        user?.isAuthenticated === true ||
                        user?.googleAccount === true ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/register"
                    render={() =>
                        user?.isAuthenticated === true ||
                        user?.googleAccount === true ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <Register />
                        )
                    }
                />
                <Route
                    path="/emailConfirmation"
                    component={EmailConfirmation}
                />

                <Route
                    exact
                    path="/search/posts"
                    component={SearchResultPage}
                />
                <Route
                    path="/emailConfirmationSuccess/:userId/:token"
                    component={EmailConfirmationSuccess}
                />
                <PrivateRoute
                    exact
                    path="/dashboard"
                    Component={Dashboard}
                    appOpen={appOpen}
                    googleAccount={user?.googleAccount}
                    isAuthenticated={user?.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/profile/:username"
                    Component={Profile}
                    appOpen={appOpen}
                    googleAccount={user?.googleAccount}
                    isAuthenticated={user?.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/editProfile"
                    Component={EditProfile}
                    appOpen={appOpen}
                    googleAccount={user?.googleAccount}
                    isAuthenticated={user?.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/:userId/likes"
                    Component={Likes}
                    appOpen={appOpen}
                    googleAccount={user?.googleAccount}
                    isAuthenticated={user?.isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/:userId/posts"
                    Component={UserPosts}
                    appOpen={appOpen}
                    googleAccount={user?.googleAccount}
                    isAuthenticated={user?.isAuthenticated}
                />
                <Route path="/post/:id" component={Post} />

                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

// eslint-disable-next-line import/prefer-default-export
export { Routes }
