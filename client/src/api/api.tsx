import Axios from "../Axios";

export default {
  user: {
    signUp: (userData: any) =>
      Axios.post("/api/v1/users/signup", userData).then(res => res.data)
  }
};
