import { UpdatePostAdmin } from "page/admin/UpdatePostAdmin";
import { RouteProps as DefaultRouteProps } from "react-router-dom";
import { HomeAdmin } from "../page/admin/HomeAdmin";
interface RouteProps extends DefaultRouteProps {
  path: string;
}
export const adminRoutes = {
  postUpdate: {
    component: UpdatePostAdmin,
    path: "/admin/p/:id/update",
    text: "Cập nhật bài viết",
    getPath: (id: number) => `/p/${id}/update`,
    exact: true,
  } as RouteProps,
  home: {
    component: HomeAdmin,
    path: "/admin",
    text: "Admin",
    getPath: () => "/admin",
    exact: false,
  },
};
