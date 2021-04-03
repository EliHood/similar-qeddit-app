import React, { Fragment } from 'react'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Route, Router, Redirect, Switch } from 'react-router-dom'
import Landing from './components/landing/landing'
import Dashboard from './components/dashboard/dashboard'
import EmailConfirmation from './components/emailConfirmation/emailConfirmation'
import EmailConfirmationSuccess from './components/emailConfirmationSuccess/emailConfirmationSuccess'
import Likes from './containers/Likes'
import Login from './components/login/login'
import Post from './components/post/post'
import EditProfile from './components/editProfile/editProfile'
import Profile from './components/profile/profile'
import Register from './components/register/register'
import { history } from './ourHistory'
import PrivateRoute from './PrivateRoute'
import NotFound from './components/404/404'
import CollapasedMenu from './components/menus/CollapsedMenu'
import MainNav from './components/menus/MainNav'
import useWrapperSlide from './common/useWrapperSlide'
import Search from './components/search/Search'
import UserPosts from './containers/UserPosts'
import storeHooks from './common/storeHooks'
import OurLink from './common/OurLink'
import SearchResults from './common/SearchResults'
import SearchResultPage from './components/searchResultPage/searchResultPage'
import { IRouterType } from './utils/types'

function MyRouter({
    notifications,
    hasError,
    logOut,
    darkTheme,
    isAuthenticated,
    googleAccount,
}: IRouterType) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    )
    const { classes, appOpen, appSetOpen } = useWrapperSlide()
    const { user } = storeHooks()
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined
    const handleNotificationClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setAnchorEl(event.currentTarget)
        notifications(user.id)
    }

    const handleClose = React.useCallback(() => {
        setAnchorEl(null)
    }, [setAnchorEl])
    return hasError ? (
        <div>Error</div>
    ) : (
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
                        darkTheme={darkTheme}
                        isAuthenticated={isAuthenticated}
                        googleAccount={googleAccount}
                        open={open}
                        anchorEl={anchorEl}
                        notificationId={id}
                    />
                    <MainNav
                        darkTheme={darkTheme}
                        logOut={logOut}
                        handleClose={handleClose}
                        open={open}
                        notificationId={id}
                        anchorEl={anchorEl}
                        handleNotificationClick={handleNotificationClick}
                        isAuthenticated={isAuthenticated}
                        googleAccount={googleAccount}
                    />
                </Toolbar>
            </AppBar>

            <Switch>
                <Route exact path="/" render={() => <Landing />} />
                <Route
                    path="/login"
                    render={() =>
                        isAuthenticated === true || googleAccount === true ? (
                            <Redirect to="/dashboard" />
                        ) : (
                            <Login />
                        )
                    }
                />
                <Route
                    path="/register"
                    render={() =>
                        isAuthenticated === true || googleAccount === true ? (
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
                    googleAccount={googleAccount}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/profile/:username"
                    Component={Profile}
                    appOpen={appOpen}
                    googleAccount={googleAccount}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/editProfile"
                    Component={EditProfile}
                    appOpen={appOpen}
                    googleAccount={googleAccount}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/:userId/likes"
                    Component={Likes}
                    appOpen={appOpen}
                    googleAccount={googleAccount}
                    isAuthenticated={isAuthenticated}
                />
                <PrivateRoute
                    exact
                    path="/:userId/posts"
                    Component={UserPosts}
                    appOpen={appOpen}
                    googleAccount={googleAccount}
                    isAuthenticated={isAuthenticated}
                />
                <Route path="/post/:id" component={Post} />

                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default MyRouter
