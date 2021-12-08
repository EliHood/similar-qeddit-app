import React from 'react'
import Grid from '@material-ui/core/Grid'
import { IMainNavType } from '@mfe/redux-store/src/types';
import OurMenu from './Menu'
import DynamicMenu from './DynamicMenu'


function CollapasedMenu({
    isAuthenticated,
    googleAccount,
    darkTheme,
    appOpen,
    setOpen,
    logOut,
    handleClose,
    handleNotificationClick,
    open,
    anchorEl,
    notificationId,
}: IMainNavType) {
    return (
        <Grid item>
            <OurMenu appOpen={appOpen} setOpen={setOpen}>
                <DynamicMenu
                    isAuthenticated={isAuthenticated}
                    googleAccount={googleAccount}
                    darkTheme={darkTheme}
                    logOut={logOut}
                    notificationId={notificationId}
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                    handleNotificationClick={handleNotificationClick}
                    type="collapsed-menu"
                />
            </OurMenu>
        </Grid>
    )
}

export default CollapasedMenu
