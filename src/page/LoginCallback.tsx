import { useReactOidc } from "@axa-fr/react-oidc-context";
import React from "react";
import { Redirect } from "react-router-dom";

export const LoginCallback = () => {
  const { oidcUser } = useReactOidc();
  if (oidcUser != null && oidcUser.state?.url != null)
    return <Redirect to={oidcUser.state.url} />;
  return <Redirect to="/" />;
};
