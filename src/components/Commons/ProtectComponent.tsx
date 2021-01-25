import { useReactOidc } from "@axa-fr/react-oidc-context";
import { NotAuthorized } from "page/NotAuthorized";
import React, { ComponentType, PropsWithChildren } from "react";
import { NotAuthenticated } from "./NotAuthenticated";
interface Props {
  children: React.ReactNode;
  owner?: string;
  scopes?: string[];
}

export const ProtectedComponent = (props: Props) => {
  const { oidcUser, isEnabled } = useReactOidc();
  const { isAuthorized, isAuthenticated } = React.useMemo(() => {
    if (oidcUser == null) return { isAuthorized: false };
    const isAuthenticated = true;
    if (props.owner != null && oidcUser.profile.sub !== props.owner)
      return { isAuthorized: false, isAuthenticated };
    if (props.scopes == null) return { isAuthorized: true, isAuthenticated };
    const isAuthorized = props.scopes.reduce((valid: boolean, current) => {
      return (
        valid && oidcUser.scopes.filter((scope) => scope === current).length > 0
      );
    }, true);
    return { isAuthorized, isAuthenticated };
  }, [props.scopes, oidcUser, props.owner]);
  if (isEnabled && !isAuthenticated) return <NotAuthenticated />;
  if (isEnabled && !isAuthorized) return <NotAuthorized />;
  return <>{props.children}</>;
};
export const withAuthorized = (WrappedComponent: ComponentType) => (
  props: PropsWithChildren<any>
) => (
  <ProtectedComponent>
    <WrappedComponent {...props} />
  </ProtectedComponent>
);
