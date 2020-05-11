import React, { Fragment, useEffect, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
// import { userStore } from "../../selectors/selectors";
export default function Notification(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const didMountRef = useRef<Object>();
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
        } else {
            console.log("test");
        }
    }, []);

    return (
        <Fragment>
            <div style={{ color: "#fff" }} onClick={props.handleNotificationClick}>
                {props.title}
            </div>

            <Popover
                id={props.id}
                open={props.open}
                anchorEl={props.anchorEl}
                onClose={props.handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography style={{ padding: "20px" }} color="secondary" variant="h6">
                    Notifications:{" "}
                </Typography>
                <Divider />
                {props.getNotifications.length > 0 && props.getNotifications.find((item) => item.status === "unread") ? (
                    props.getNotifications.map((notification, i) =>
                        notification.status === "unread" ? (
                            <Fragment key={i}>
                                <Typography
                                    onClick={() => props.markAsReadInit(notification.notificationId)}
                                    style={{ width: "300px", cursor: "pointer", padding: "20px", backgroundColor: "rgba(0,0,0,0.08)" }}
                                >
                                    {notification.body}
                                </Typography>
                                <Divider />
                            </Fragment>
                        ) : (
                            <Typography key={i} style={{ width: "300px", padding: "20px" }}>
                                {notification.body}
                            </Typography>
                        ),
                    )
                ) : (
                    <Typography style={{ width: "300px", padding: "20px" }}>No Notifications</Typography>
                )}
            </Popover>
        </Fragment>
    );
}
