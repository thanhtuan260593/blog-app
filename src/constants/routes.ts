import { Home } from "views/Home";
import { PostTagView } from "views/PostTag";
import { UpdatePost } from "views/UpdatePost";
import { ComposePost } from "views/ComposePost";
import { PostDetailView } from "views/PostDetail";
import { SearchResultView } from "views/SearchResult";
import React from "react";
export const routes = {
  home: {
    component: React.lazy(() =>
      import("views/Home").then((u) => ({ default: u.Home }))
    ),
    path: "/",
    getPath: () => "/",
  },
  postByTag: {
    component: React.lazy(() =>
      import("views/PostDetail").then((u) => ({ default: u.PostDetailView }))
    ),
    path: "/post/tags",
    getPath: () => "/post/tags",
  },
  postCreate: {
    component: React.lazy(() =>
      import("views/ComposePost").then((u) => ({ default: u.ComposePost }))
    ),
    path: "/post/create",
    getPath: () => "/post/create",
  },
  postUpdate: {
    component: React.lazy(() =>
      import("views/UpdatePost").then((u) => ({ default: u.UpdatePost }))
    ),
    path: "/post/update/:id",
    getPath: (id: number) => `/post/update/${id}`,
  },
  postDetail: {
    component: React.lazy(() =>
      import("views/PostDetail").then((u) => ({ default: u.PostDetailView }))
    ),
    path: "/post/:id",
    getPath: (id: number) => `/post/${id}`,
  },
  search: {
    component: React.lazy(() =>
      import("views/SearchResult").then((u) => ({
        default: u.SearchResultView,
      }))
    ),
    path: "/search",
    getPath: "/search",
  },
};
