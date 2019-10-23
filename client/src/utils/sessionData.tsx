export default {
  // save logged session
  setUserLoggedIn: (token: string) => {
    localStorage.setItem("jwtToken", token);
  },
  // remove token
  setUserLoggdOut: () => {
    localStorage.removeItem("jwtToken");
  },
  //   check if a user is signed in and stuff
  getLoginStatus: () => (localStorage.getItem("jwtToken") ? true : false)
};
