import { Admin } from "page/admin/PostAdmin";
import { Home } from "page/HomePage";
import { MyPostsPage } from "page/MyPosts";
import { PostPage } from "page/PostPage";
import { PostTagView } from "page/PostTag";
import { SearchResultView } from "page/SearchResult";
import { UserPostPage } from "page/UserPosts";
import {
  generatePath,
  RouteProps as DefaultRouteProps,
} from "react-router-dom";
interface RouteProps extends DefaultRouteProps {
  path: string;
}
export const generateIDParamPath = (route: RouteProps, id: number) =>
  generatePath(route.path, { id });

export const routes = {
  post: {
    component: PostPage,
    path: "/p",
    text: "Bài viết",
    getPath: () => "/search",
    exact: false,
  },
  tag: {
    component: PostTagView,
    path: "/t/:tag",
    getPath: (tag: string) => `/t/${tag}`,
    exact: true,
  },
  user: {
    component: UserPostPage,
    path: "/u/:user",
    text: "Bài viết cá nhân",
    getPath: (user: string) => `/u/${user}`,
    exact: true,
  },
  search: {
    component: SearchResultView,
    path: "/search",
    text: "Tìm kiếm",
    getPath: () => "/search",
    exact: true,
  },
  admin: {
    component: Admin,
    path: "/admin",
    getPath: () => "/admin",
    text: "Admin",
    exact: false,
  },
  me: {
    component: MyPostsPage,
    path: "/me",
    getPath: () => "/me",
    text: "Trang của tôi",
    exact: true,
  },
  home: {
    component: Home,
    path: "/",
    text: "Trang chủ",
    getPath: () => "/",
    exact: true,
  },
};
