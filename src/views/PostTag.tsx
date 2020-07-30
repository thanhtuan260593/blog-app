import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostByTags } from "components/Post/PostByTags";
import { Layout3 } from "layout/Layout3";
const queryString = require("query-string");

export const PostTagView = ({ location }: RouteComponentProps) => {
  const tags = useMemo(() => {
    console.log(location.search);
    const parsed: { tags: string[] | string } = queryString.parse(
      location.search
    );
    if (typeof parsed.tags == "string") return [parsed.tags];
    return parsed.tags;
  }, [location.search]);

  return (
    <Layout3>
      <div className="card">
        <PostByTags tags={tags} />
      </div>
    </Layout3>
  );
};
