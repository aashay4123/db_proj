import cookie from "js-cookie";

export const getLocalStorage = (key) => {
  if (window) {
    return localStorage.getItem(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (window) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (window) {
    localStorage.removeItem(key);
  }
};

export const setcookie = (key, value) => {
  if (window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removecookie = (key) => {
  if (window) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getcookie = (key) => {
  if (window) {
    return cookie.get(key);
  }
};

export const isAuth = () => {
  if (window) {
    // console.log(localStorage.getItem("user"), getcookie("jwt"));

    if (
      !!localStorage.getItem("user") &&
      localStorage.getItem("user") !== "undefined"
    ) {
      return JSON.parse(localStorage.getItem("user") ?? "");
    } else {
      return false;
    }
  }
};

export const authenticate = (response, next) => {
  setLocalStorage("user", response.data.user);
  setLocalStorage("token", response.data.token);

  const expirationDate = new Date(new Date().getTime() + 60 * 60 * 7 * 1000);
  setLocalStorage("expirationDate", expirationDate.toDateString());

  if (next) next();
};
