const React = require("react");
const { removeLocalStorage } = require("../utility/helper");
const { getAction } = require("../utility/generalServices");

const Header = () => {
  const logoutClick = async () => {
    removeLocalStorage("user");
    removeLocalStorage("expirationDate");
    await getAction("/logout");
    window.location.href = "/";
  };
  return (
    <div className="option logout" onClick={() => logoutClick()}>
      Logout
    </div>
  );
};

export default Header;
