import React from "react";
import { adminRoutes } from "constants/adminRoutes";
import { Route, Switch } from "react-router-dom";
export const Admin = () => {
  return (
    <Switch>
      {Object.values(adminRoutes).map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  );
};
