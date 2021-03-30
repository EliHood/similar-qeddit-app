import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../selectors/selectors";
import { notificationInit } from "../actions/postActions";

function useNotificationHook() {
    const dispatch = useDispatch();
    const notifications = useSelector(getNotifications);
    React.useEffect(() => {
        dispatch(notificationInit());
    }, []);

    return [notifications];
}

export default useNotificationHook;
