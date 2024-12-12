const { isAuth, setLocalStorage, removeLocalStorage } = require("./helper");

const { getAction } = require("./generalServices");
const axiosInstance = require("./axios_interceptor");
const { toast } = require("react-toastify");

const logout = (next) => {
  removeLocalStorage("user");
  removeLocalStorage("expirationDate");
  getAction("/auth/logout", next);
};

const auth = (callback, errCallback) => {
  axiosInstance
    .get("/api/me")
    .then((response) => {
      setLocalStorage("user", response.data.user);
      const expirationDate = new Date(
        new Date().getTime() + 7 * 60 * 60 * 1000,
      );
      localStorage.setItem("expirationDate", expirationDate.toDateString());
      if (callback) callback();
    })
    .catch((err) => {
      if (errCallback) errCallback(err);
    });
};

const authCheckState = (callback, errCallback) => {
  const user = isAuth();
  if (user) {
    const expirationDate = new Date(
      localStorage.getItem("expirationDate") ?? "",
    );
    if (expirationDate <= new Date()) {
      logout(() => {
        toast.error("Your session has been expired");
        //    window.location.reload();
      });
    } else {
      if (callback) callback();
    }
  } else {
    auth(callback, errCallback);
  }
};

const onAuth = (callback) => {
  axiosInstance
    .get("/users/me")
    .then((response) => {
      setLocalStorage("user", response.data.user);
      if (callback) callback(response);
    })
    .catch((err) => {
      toast.error("something went wrong");
    });
};

module.exports = {
  logout,
  auth,
  authCheckState,
  onAuth,
};
