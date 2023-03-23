/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import Axios from 'axios'
import { getConfig } from '@core/config'

const AxiosInstance = Axios.create({
    baseURL: getConfig()?.backendUrl,
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
