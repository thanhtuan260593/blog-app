import React, { useCallback } from "react";
import { PostProps } from "resources/models/post";
import { PostListConsumer } from "components/post/PostList";
import { PostStackConsumer } from "components/post/PostStack";
import { Box } from "@chakra-ui/react";

import { TagIconSet } from "components/tag/TagIcon";
import {
  countSearchedPosts,
  getCount,
  getPosts,
  searchPosts,
} from "resources/api/post";
import { PostsProvider } from "./PostProvider";
import { LoadMoreConsumer } from "./PostConsumers";

interface PostByTagsProp {
  minimal?: boolean;
  tags: string[];
  showImage?: boolean;
  showTag?: boolean;
  filter?: (posts: PostProps[]) => PostProps[];
  limit?: number;
  displayType: "stack" | "list";
  includeAllTags?: boolean;
}

export const PostByTags = (props: PostByTagsProp) => {
  const icon = React.useMemo(() => {
    if (props.tags.length === 1) {
      const tag = props.tags[0];
      if (tag in TagIconSet) return TagIconSet[tag];
    }
    return undefined;
  }, [props]);
  const get = useCallback(
    (offset: number, limit: number) => {
      if (props.includeAllTags) {
        return getPosts(offset, limit, props.tags);
      }
      return searchPosts(offset, limit, props.tags, undefined);
    },
    [props.includeAllTags, props.tags]
  );
  const count = useCallback(() => {
    if (props.includeAllTags) {
      return getCount(props.tags);
    }
    return countSearchedPosts(props.tags, undefined);
  }, [props.includeAllTags, props.tags]);

  return (
    <PostsProvider query={get} count={count} filter={props.filter} initLoad>
      <Box w="100%" h="100%" overflowY="auto">
        {props.displayType === "list" && <PostListConsumer icon={icon} />}
        {props.displayType === "stack" && <PostStackConsumer icon={icon} />}
        <LoadMoreConsumer />
      </Box>
    </PostsProvider>
  );
};
