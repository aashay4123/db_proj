import { useRoutes } from "react-router";
import Routes from "./useRoutes";
import "./App.css";
const App = (props) => {
  const { error } = props;

  if (error) console.log("app error", error);

  const routing = useRoutes(Routes());

  return routing;
};

export default App;
