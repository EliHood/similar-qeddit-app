import React from "react";
import Notification from "../../containers/notificationTooltip";
import Button from "@material-ui/core/Button";
const Notfications = (props: any) => {
    console.log("checking for undefined", props);
    return <Notification userId={props.currentUser.id} id={props.notificationId} handleClose={props.handleClose} open={props.open} anchorEl={props.anchorEl} title={"Notifications"} />;
};

export default Notfications;
