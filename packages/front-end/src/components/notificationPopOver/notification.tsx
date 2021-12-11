import React, { Fragment, useEffect, useRef } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { userActions, selectors } from '@mfe/redux-store';
import { useSelector } from 'react-redux';


export default function Notification(props: any) {
    const didMountRef = useRef<Object>();
    const getNotfications = useSelector(selectors.getNotifications);
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
        } else {
            // console.log("test");
        }
    }, []);
    const { title, handleNotificationClick, open, anchorEl, id, handleClose, getNotifications } = props
    return (
        <>
            <div style={{ color: '#fff' }} onClick={handleNotificationClick}>
                {title}
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography style={{ padding: '20px' }} color="secondary" variant="h6">
                    Notifications:
                    {' '}
                </Typography>
                <Divider />
                {getNotfications.length > 0 && getNotfications.find((item) => item.status === 'unread') ? (
                   getNotifications.map((notification, i) => (notification.status === 'unread' ? (
                        <Fragment key={i}>
                            <Typography
                                onClick={() => userActions.markAsReadInit(notification.notificationId)}
                                style={{
                                    width: '300px', cursor: 'pointer', padding: '20px', backgroundColor: 'rgba(0,0,0,0.08)',
                                }}
                            >
                                {notification.body}
                            </Typography>
                            <Divider />
                        </Fragment>
                    ) : (
                        <Typography key={i} style={{ width: '300px', padding: '20px' }}>
                            {notification.body}
                        </Typography>
                    )))
                ) : (
                    <Typography style={{ width: '300px', padding: '20px' }}>No Notifications</Typography>
                )}
            </Popover>
        </>
    );
}
