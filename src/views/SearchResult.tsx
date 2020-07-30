import React, { useMemo, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostProps } from "resources/models/PostProps";
import { postAPI } from "resources/api/post";
import { PostList } from "components/Post/PostList";
import { LoadingPost } from "components/Post/Post";
import { Layout3 } from "layout/Layout3";
const queryString = require("query-string");
interface SearchQuery {
  tags?: string[];
  keywords?: string[];
}

export const SearchResultView = (props: RouteComponentProps) => {
  const [posts, setPosts] = useState<PostProps[]>();
  const query = useMemo(() => {
    const query: SearchQuery = queryString.parse(props.location.search);
    return query;
  }, [props.location]);
  useEffect(() => {
    postAPI.searchPosts(0, 10, query.tags, query.keywords).then(setPosts);
  }, [query]);
  if (posts == null) return <LoadingPost />;
  return (
    <Layout3>
      <div className="card">
        <div className="card-header">
          <h2>KẾT QUẢ TÌM KIẾM</h2>
        </div>
        <PostList posts={posts} />;
      </div>
    </Layout3>
  );
};
