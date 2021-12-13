import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectors, postActions } from '@mfe/redux-store/src'

function useNotificationHook() {
    const dispatch = useDispatch()
    const notifications = useSelector(selectors.getNotifications)
    React.useEffect(() => {
        dispatch(postActions.notificationInit())
    }, [])

    return [notifications]
}

export default useNotificationHook
