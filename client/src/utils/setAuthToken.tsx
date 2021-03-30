import Axios from "../ourAxios";

const setAuthToken = (token) => {
    if (token) {
        // Apply to every request
        Axios.defaults.headers.common.Authorization = token;
    } else {
        // Delete auth header
        delete Axios.defaults.headers.common.Authorization;
    }
};

export default setAuthToken;
