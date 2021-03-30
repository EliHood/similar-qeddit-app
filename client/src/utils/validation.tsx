const isEmail = (email: string) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.match(regEx)) {
        return true;
    }
    return false;
    
};

export default {
    validateEmail: (chars: string) => {
        if (chars.length > 0) {
            if (isEmail(chars)) {
                return true;
            }
 
                return "Email not valid";
            
        }
 
            return "Field cannot be empty";
        
    },

    validateUsername: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            }
 
                return "Username must be at least 6 chars";
            
        }
 
            return "Field cannot be empty";
        
    },
    validatePassword: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            }
 
                return "Must be at least 6 chars";
            
        }
 
            return "Field cannot be empty";
        
    },
    validatePasswordConf: (chars: string, password: string) => {
        if (chars.length > 0) {
            if (chars.length < 6) {
                return "Must be at least 6 chars";
            } else if (chars !== password) {
                return "Passwords doesn't match";
            }
 
                return true;
            
        }
 
            return "Field cannot be empty";
        
    },
    validateString: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 6) {
                return true;
            }
 
                return "Must be at least 6 chars";
            
        }
 
            return "Field cannot be empty";
        
    },
    validateContent: (chars: string) => {
        if (chars.length > 0) {
            if (chars.length > 10) {
                return true;
            }
 
                return "Must be at least 10 chars";
            
        }
 
            return "Field cannot be empty";
        
    },
};
