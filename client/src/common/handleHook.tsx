import React, { useState } from "react";

export const InputHook = (props) => {
    const handleInputChange = (event) => {
        if (event.target.name === "title") {
            props.addTitle(event.target.value);
        }
        if (event.target.name === "postContent") {
            props.addContent(event.target.value);
        }
        if (event.target.name === "username") {
            props.addUsername(event.target.value);
        }
        if (event.target.name === "email") {
            props.addEmail(event.target.value);
        }
        if (event.target.name === "password") {
            props.addPassword(event.target.value);
        }
        if (event.target.name === "passwordConf") {
            props.addPasswordConf(event.target.value);
        } else {
            return null;
        }
    };
    return {
        handleInputChange,
    };
};
