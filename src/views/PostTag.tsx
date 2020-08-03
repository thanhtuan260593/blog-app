import React, { useMemo, useEffect, useCallback } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostByTags } from "components/Post/PostByTags";
import { Layout3 } from "layout/Layout3";
import { BreadscrumbContext } from "components/Commons/Breadscrumbs";
import { routes } from "constants/routes";
import { IBreadcrumbProps } from "@blueprintjs/core";
const queryString = require("query-string");

export const PostTagView = ({ location }: RouteComponentProps) => {
  const { setBreadscrumbs } = React.useContext(BreadscrumbContext);
  const tags = useMemo(() => {
    const parsed: { tags: string[] | string } = queryString.parse(
      location.search
    );
    if (parsed == null || parsed.tags == null) return [];
    if (typeof parsed.tags == "string") return [parsed.tags];
    return parsed.tags;
  }, [location]);
  const breadscrumbsHandler = useCallback(
    (pathname: string, search: string) => {
      const getTags = () => {
        const parsed: { tags: string[] | string } = queryString.parse(search);
        if (parsed == null || parsed.tags == null) return [];
        if (typeof parsed.tags == "string") return [parsed.tags];
        return parsed.tags;
      };

      const tags = getTags();
      if (tags.length === 0) {
        return [
          { href: routes.home.path, text: routes.home.text, icon: "home" },
          { text: "Tất cả bài viết" },
        ] as IBreadcrumbProps[];
      }

      const replaced: IBreadcrumbProps[] = [
        { href: routes.home.path, text: routes.home.text, icon: "home" },
        ...tags.map((tag) => {
          const url = routes.postByTag.path;
          const query = { tags: [tag] };
          const href = queryString.stringifyUrl({ query, url });
          return { href, text: tag } as IBreadcrumbProps;
        }),
      ];
      return replaced;
    },
    []
  );
  useEffect(() => {
    const bs = breadscrumbsHandler(location.pathname, location.search);
    setBreadscrumbs && setBreadscrumbs(bs);
  }, [setBreadscrumbs, location, breadscrumbsHandler]);

  return (
    <Layout3>
      <div className="card">
        <PostByTags tags={tags} />
      </div>
    </Layout3>
  );
};
