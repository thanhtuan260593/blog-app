import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { routes } from "constants/routes";
import { PostNotFound } from "./PostDetail";
import { PostsByUser } from "components/post/PostsByUser";

export const UserPostPage = () => {
  const location = useLocation();
  const userName = React.useMemo(() => {
    const match = matchPath<{ user: string }>(location.pathname, routes.user);
    return match?.params.user;
  }, [location]);
  if (userName == null) return <PostNotFound />;
  return <PostsByUser user={userName} />;
};
