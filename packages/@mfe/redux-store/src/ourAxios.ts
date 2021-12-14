/* eslint-disable import/no-extraneous-dependencies */
import Axios from 'axios'

const AxiosInstance = Axios.create({
    baseURL: 'http://localhost:3001', // localhost:3000
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

AxiosInstance.interceptors.response.use(
    (response) =>
        // const token = localStorage.getItem('auth');
        // response.headers.Authorization =  token ? `Bearer ${token}` : '';

        response
)

export default AxiosInstance
