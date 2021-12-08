import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IButtonBar } from '../types'

const styles = makeStyles((theme) => ({
    buttonBar: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        margin: '10px',
        paddingLeft: '16px',
        right: 0,
        width: '100%',
        background: 'transparent',
    },
}))

const ButtonBar: React.FC<IButtonBar> = ({ children }) => {
    const classes = styles()
    return (
        <div className={classes.buttonBar} id="appbar-collapse">
            {children}
        </div>
    )
}
export default ButtonBar
