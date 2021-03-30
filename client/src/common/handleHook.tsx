import React from "react";

export default function useInputChange(props) {
    const { addTitle, addContent, addUsername, addEmail, addPassword, addPasswordConf } = props;

    return React.useCallback(
        (event) => {
            if (event.target.name === "title") {
                addTitle(event.target.value);
            }

            if (event.target.name === "postContent") {
                addContent(event.target.value);
            }

            if (event.target.name === "username") {
                addUsername(event.target.value);
            }

            if (event.target.name === "email") {
                addEmail(event.target.value);
            }

            if (event.target.name === "password") {
                addPassword(event.target.value);
            }

            if (event.target.name === "passwordConf") {
                addPasswordConf(event.target.value);
            } else {
                return null;
            }
        },
        [addTitle, addContent, addUsername, addEmail, addPassword, addPasswordConf],
    );
}
