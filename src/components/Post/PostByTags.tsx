import React, { useState, useEffect } from "react";
import { PostOverviewProps } from "./PostProp";
import { PostList } from "./Post";
import { Spinner } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";

interface PostByTagsProp {
  tags: string[];
}
export const PostByTags = (props: PostByTagsProp) => {
  const [posts, setPosts] = useState<PostOverviewProps[]>();
  const [paging, setPaging] = useState<{ index: number; rows: number }>({
    index: 0,
    rows: 10,
  });
  useEffect(() => {
    postAPI
      .getPosts(paging.index, paging.rows, props.tags)
      .then((posts) => setPosts(posts as PostOverviewProps[]));
  }, [props.tags]);
  if (posts == undefined) return <Spinner />;
  return <PostList posts={posts} />;
};
