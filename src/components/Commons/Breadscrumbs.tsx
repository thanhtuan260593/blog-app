import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { routes } from "constants/routes";
import {
  IBreadcrumbProps,
  Breadcrumbs as BPBreadscrumbs,
} from "@blueprintjs/core";
import { useLocation, matchPath } from "react-router-dom";

export const useBreadscrumbs = () => {
  const [breadscrumbs, setBreadscrumbs] = useState<IBreadcrumbProps[]>([]);
  const location = useLocation();
  useEffect(() => {
    console.log("location changed");
    let subs = location.pathname.split("/");
    subs = subs.filter((u) => u !== "");
    let br: IBreadcrumbProps[] = [
      { text: "Trang chủ", href: "/", icon: "home" },
    ];
    let path = "";
    for (let i = 0; i < subs.length; i++) {
      path = path + "/" + subs[i];
      const _path = path;
      const breadscrumb = Object.keys(routes).reduce(
        (pre: IBreadcrumbProps | undefined, cur) => {
          if (pre) return pre;
          const route = routes[cur];
          const match = matchPath(_path, {
            path: route.path,
            exact: true,
          });
          if (match != null && match.isExact) {
            return { href: match.url, text: route.text } as IBreadcrumbProps;
          }
          return pre;
        },
        undefined
      );
      if (breadscrumb !== undefined) {
        br = [...br, breadscrumb];
      }
    }
    setBreadscrumbs(br);
  }, [location]);

  return [breadscrumbs, setBreadscrumbs] as [
    IBreadcrumbProps[],
    Dispatch<SetStateAction<IBreadcrumbProps[]>>
  ];
};
export interface BreadscrumbContextProps {
  breadscrumbs?: IBreadcrumbProps[];
  setBreadscrumbs?: (bs: IBreadcrumbProps[]) => void;
  replaceBreadscrumbs?: (bs: IBreadcrumbProps[]) => void;
}

export const BreadscrumbContext = React.createContext<BreadscrumbContextProps>(
  {}
);

// export const Breadcrumbs = () => <div></div>;

export const Breadcrumbs = () => {
  // const [breadscrumbs, setBreadscrumbs] = useState<IBreadcrumbProps[]>([]);
  const { setBreadscrumbs, breadscrumbs } = React.useContext(
    BreadscrumbContext
  );
  const location = useLocation();
  useEffect(() => {
    let subs = location.pathname.split("/");
    subs = subs.filter((u) => u !== "");
    subs = ["", ...subs];
    let br: IBreadcrumbProps[] = [];
    let path = "";
    for (let i = 0; i < subs.length; i++) {
      path = path + "/";
      if (path === "//") path = "/";
      path = path + subs[i];
      const _path = path;
      const breadscrumb = Object.keys(routes).reduce(
        (pre: IBreadcrumbProps | undefined, cur) => {
          if (pre) return pre;
          const route = routes[cur];
          const match = matchPath(_path, {
            path: route.path,
            exact: true,
          });
          if (match != null && match.isExact) {
            return { href: match.url, text: route.text } as IBreadcrumbProps;
          }
          return pre;
        },
        undefined
      );
      if (breadscrumb !== undefined) {
        br = [...br, breadscrumb];
      }
    }
    setBreadscrumbs && setBreadscrumbs(br);
  }, [location, setBreadscrumbs]);
  return (
    <div className="breadscrumbs">
      <BPBreadscrumbs items={breadscrumbs} />
    </div>
  );
};
