const isLetterOnly = (chars: string) => {
    const onlyLetter = /^[a-zA-Z]+$/;
    return chars.match(onlyLetter);
};

const isEmail = (email: string) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) {
        return true;
    } else {
        return false;
    }
};

export default {
    validateEmail: (chars: string) => {
        if (chars.length > 0) {
            if (isEmail(chars)) {
                return true;
            } else {
                return "Email not valid";
            }
        } else {
            return "Field cannot be empty";
        }
    },

    validateUsername: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            } else {
                return "Username must be at least 6 chars";
            }
        } else {
            return "Field cannot be empty";
        }
    },
    validatePassword: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            } else {
                return "Must be at least 6 chars";
            }
        } else {
            return "Field cannot be empty";
        }
    },
    validatePasswordConf: (chars: string, password: string) => {
        if (chars.length > 0) {
            if (chars.length < 6) {
                return "Must be at least 6 chars";
            } else if (chars !== password) {
                return "Passwords doesn't match";
            } else {
                return true;
            }
        } else {
            return "Field cannot be empty";
        }
    },
    validateString: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            } else {
                return "Must be at least 6 chars";
            }
        } else {
            return "Field cannot be empty";
        }
    },
    validateContent: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 10) {
                return true;
            } else {
                return "Must be at least 10 chars";
            }
        } else {
            return "Field cannot be empty";
        }
    },
};
