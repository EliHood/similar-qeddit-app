import React from 'react';
import Button from '@material-ui/core/Button';

const buttonStyle = {
    color: '#fff',
    fontSize: '11px',
};
const OurSecondaryButton = (props) => (
    <Button {...props} data-testid={props.test} variant="contained" style={buttonStyle}>
        {props.children}
    </Button>
);
export default OurSecondaryButton;
