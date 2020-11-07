import { useHistory } from "react-router-dom";

import { debug } from "../utils/constants";

const RouteDebugging = ({ children }) => {
  const history = useHistory();
  if (process.env.NODE_ENV === "development" && debug.ROUTING) {
    history.listen((location, action) => {
      console.log("=============");
      console.log(
        `Route: ${location.pathname}${location.search}, State: ${JSON.stringify(
          location.state
        )}`
      );
      console.log("=============");
    });
  }

  return children;
};

export default RouteDebugging;
