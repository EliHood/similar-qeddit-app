import Axios from "axios";
import "dotenv/config";

const AxiosInstance = Axios.create({
  baseURL: "http://localhost:3000", // localhost:3000
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

AxiosInstance.interceptors.response.use(
  response =>
    // const token = localStorage.getItem('auth');
    // response.headers.Authorization =  token ? `Bearer ${token}` : '';
    // console.log(token);
    response
);

export default AxiosInstance;
