import { Navigate } from "react-router-dom";
import { isAuth } from "./utility/helper";
import Home from "./container/HomePage";
import PrescriptionList from "./container/PrescriptionList";
import AddPrescription from "./container/AddPrescription";
import PrescriptionDetail from "./container/PrescriptionDetail";

const PrivateRoute = ({ element }) => {
  return isAuth() ? <>{element}</> : <Navigate to="/" />;
};

const routes = () => {
  const commonRoutes = [{ path: "/", element: <Home /> }];

  const privateRoutes = [
    { path: "/prescriptions", element: <PrescriptionList /> },
    { path: "/addprescription", element: <AddPrescription /> },
    { path: "/prescription/:id", element: <PrescriptionDetail /> },
  ];

  const protectedRoutes = privateRoutes.map((route) => ({
    ...route,
    element: <PrivateRoute element={route.element} />,
  }));

  return [...commonRoutes, ...protectedRoutes];
};

export default routes;
