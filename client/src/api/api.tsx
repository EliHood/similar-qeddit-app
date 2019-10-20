import Axios from "../Axios";

export default {
  user: {
    registerUser: userData =>
      Axios.post("/users/register", userData).then(res => res.data)
  }
};
