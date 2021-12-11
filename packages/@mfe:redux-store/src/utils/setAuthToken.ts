import Axios from '../ourAxios';

export const setAuthToken = (token:any) => {
    if (token) {
    // Apply to every request
        Axios.defaults.headers.common.Authorization = token;
    } else {
    // Delete auth header
        delete Axios.defaults.headers.common.Authorization;
    }
};
