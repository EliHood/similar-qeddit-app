import React from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { userActions } from '@mfe/redux-store'
import { history } from '../ourHistory'
import CollapasedMenu from '../organisms/CollapsedMenu'
import MainNav from '../organisms/MainNav'
import useWrapperSlide from '../hooks/useWrapperSlide'
import Search from '../molecules/Search'
import storeHooks from '../hooks/useStoreHooks'
import SearchResults from '../molecules/SearchResults'

function Navbar() {
    const dispatch = useDispatch()
    const { user, isAuthenticated, isGoogleAccount } = storeHooks()
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
                        Similar Reddit App
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
                    isAuthenticated={isAuthenticated}
                    googleAccount={isGoogleAccount}
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
                    isAuthenticated={isAuthenticated}
                    googleAccount={isGoogleAccount}
                />
            </Toolbar>
        </AppBar>
    )
}
// eslint-disable-next-line import/prefer-default-export
export { Navbar }
