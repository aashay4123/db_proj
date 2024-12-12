import { isEmpty } from "lodash";
import React from "react";
import { Navigate } from "react-router";
import { isAuth } from "../utility/helper";
import ErrorPage from "../components/Shared/ErrorPage";

const WithAuth = (role) => (Component) =>
  class withAuth extends React.Component {
    renderProtectedPage() {
      const user = isAuth();
      const userRole = user && user.role;

      let isAuthorized = isAdmin;
      if (!isEmpty(role)) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      const newRegex = new RegExp("/" + user.gender, "g");
      if (!user) {
        return <Navigate to="/" />;
      } else if (!isAuthorized) {
        return <ErrorPage error="unAuthorized" />;
      } else if (isAdmin) {
        return <Component {...this.props} />;
      } else if (newRegex.test(window.location.href)) {
        return <ErrorPage error="unAuthorized" />;
      } else if (!user.user_team) {
        return <Navigate to="/draft" />;
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };

export default WithAuth;
