import { CreatePostPage } from "page/CreatePost";
import { PostDetailView, PostNotFound } from "page/PostDetail";
import { UpdatePostUser } from "page/UpdatePost";
import React from "react";
import {
  generatePath,
  RouteProps as DefaultRouteProps,
} from "react-router-dom";
interface RouteProps extends DefaultRouteProps {
  path: string;
}
export const generateIDParamPath = (route: RouteProps, id: number) =>
  generatePath(route.path, { id });

export const postRoutes = {
  postCreate: {
    component: CreatePostPage,
    path: "/p/create",
    text: "Tạo bài viết",
    getPath: () => "/p/create",
    exact: true,
  } as RouteProps,
  postUpdate: {
    render: (props) => <UpdatePostUser {...props} />,
    path: "/p/:id/update",
    text: "Cập nhật bài viết",
    getPath: (id: number) => `/p/${id}/update`,
    exact: true,
  } as RouteProps,
  postNotFound: {
    component: PostNotFound,
    path: "/p/notfound",
    text: "Không tìm thấy",
    getPath: () => `/p/notfound`,
    exact: true,
  } as RouteProps,
  postDetail: {
    component: PostDetailView,
    path: "/p/:id",
    text: "Bài viết",
    exact: true,
  } as RouteProps,
};
