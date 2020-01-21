import React, { useState } from 'react';
export default function EmailConfirmation(props) {
    const emailMessage = props.location.state.meta.message
    return (
        <div>
            <h3>{emailMessage}</h3>
        </div>
    )
}