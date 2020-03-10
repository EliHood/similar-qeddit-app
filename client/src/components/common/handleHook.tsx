import React, { useState } from "react";

export const PostHook = (props) => {
    const handleInputChange = (event) => {
        if (event.target.name === "title") {
            props.addTitle(event.target.value);
        }
        if (event.target.name === "postContent") {
            props.addContent(event.target.value);
        } else {
            return null;
        }
    };
    return {
        handleInputChange,
    };
};
