import { postRoutes } from "constants/postRoutes";
import React from "react";
import { Route, Switch } from "react-router-dom";
const routes = [
  postRoutes.postCreate,
  postRoutes.postDetail,
  postRoutes.postNotFound,
  postRoutes.postUpdate,
];
export const PostPage = () => {
  return (
    <>
      <Switch>
        {routes.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Switch>
    </>
  );
};
