import React from 'react'
import Alert from '@material-ui/lab/Alert'
import useStoreMethods from '../../hooks/useStoreHooks'

const myStyles: React.CSSProperties = {
    position: 'fixed',
    width: '500px',
    height: '50px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'center',
    padding: '15px',
    zIndex: 99999,
}

function OurError() {
    const { errPost } = useStoreMethods()
    return (
        <Alert style={myStyles} severity="error">
            {errPost}
        </Alert>
    )
}

export default OurError
