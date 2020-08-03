import React, { LazyExoticComponent, ComponentType } from "react";

interface RouteProps {
  component: LazyExoticComponent<ComponentType<any>>;
  path: string;
  text?: string;
  getPath: (param?: any) => string;
  exact?: boolean;
}

export const routes: { [key: string]: RouteProps } = {
  postByTag: {
    component: React.lazy(() =>
      import("views/PostTag").then((u) => ({ default: u.PostTagView }))
    ),
    path: "/post/tags",
    getPath: () => "/post/tags",
    exact: true,
  },
  postCreate: {
    component: React.lazy(() =>
      import("views/CreatePost").then((u) => ({ default: u.CreatePostView }))
    ),
    path: "/post/create",
    text: "Tạo bài viết",
    getPath: () => "/post/create",
    exact: true,
  },
  postUpdate: {
    component: React.lazy(() =>
      import("views/UpdatePost").then((u) => ({ default: u.UpdatePost }))
    ),
    path: "/post/update/:id",
    text: "Cập nhật bài viết",
    getPath: (id: number) => `/post/update/${id}`,
  },
  postNotFound: {
    component: React.lazy(() =>
      import("views/PostDetail").then((u) => ({ default: u.PostNotFound }))
    ),
    path: "/post/notfound/:id",
    text: "Không tìm thấy",
    getPath: (id: number) => `/post/notfound/${id}`,
    exact: true,
  },
  postDetail: {
    component: React.lazy(() =>
      import("views/PostDetail").then((u) => ({ default: u.PostDetailView }))
    ),
    path: "/post/:id",
    text: "Bài viết",
    getPath: (id: number) => `/post/${id}`,
    exact: true,
  },
  search: {
    component: React.lazy(() =>
      import("views/SearchResult").then((u) => ({
        default: u.SearchResultView,
      }))
    ),
    path: "/search",
    text: "Tìm kiếm",
    getPath: () => "/search",
    exact: true,
  },
  admin: {
    component: React.lazy(() =>
      import("views/PostAdmin").then((u) => ({ default: u.Admin }))
    ),
    path: "/admin",
    getPath: () => "/admin",
    text: "Admin",
    exact: true,
  },
  home: {
    component: React.lazy(() =>
      import("views/Home").then((u) => ({ default: u.Home }))
    ),
    path: "/",
    text: "Trang chủ",
    getPath: () => "/",
    exact: false,
  },
};
