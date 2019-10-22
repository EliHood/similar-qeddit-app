import Axios from "../Axios";

export default {
  user: {
    signUp: (userData: any) =>
      Axios.post("/api/v1/users/signup", userData).then(res => res.data),
    autoLogin: () => Axios.get("/api/v1/users/auth").then(res => res.data),
    logOut: () => Axios.get("/api/v1/users/logout").then(res => res.data)
  }
};
