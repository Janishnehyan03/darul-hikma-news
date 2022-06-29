import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "./context/User";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { user } = useContext(UserContext);
  const isAuthenticated = user ? true : false;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          setTimeout(() => {
            <Redirect to={'/login'}/>
          }, 3000)
        )
      }
    />
  );
}

export default ProtectedRoute;
