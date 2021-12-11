import React from 'react'
import Grid from '@material-ui/core/Grid'
import { IMainNavType } from '@mfe/redux-store/src/types';
import ButtonBar from '../../common/ButtonBar'
import DynamicMenu from './DynamicMenu'

function MainNav({
    isAuthenticated,
    googleAccount,
    darkTheme,
    logOut,
    notificationId,
    open,
    anchorEl,
    handleClose,
    handleNotificationClick,
}: IMainNavType) {
    return (
        <Grid item>
            <ButtonBar>
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
                    type="main-menu"
                />
            </ButtonBar>
        </Grid>
    )
}

export default MainNav
