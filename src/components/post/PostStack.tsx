import React from "react";
import { PostOverview, PostOverviewSkeleton } from "./PostOverview";
import { PostProps } from "resources/models/post";
import { Box, VStack } from "@chakra-ui/react";
import { EmptyPosts } from "./EmptyPost";
import { PostsContext } from "./PostProvider";
export interface Props {
  posts?: PostProps[];
  total?: number;
  icon?: any;
  showImage?: boolean;
  showTag?: boolean;
  minimal?: boolean;
}

export const PostStackSkeleton = () => (
  <VStack spacing={6} justify="stretch" align="stretch">
    <PostOverviewSkeleton />
    <PostOverviewSkeleton />
    <PostOverviewSkeleton />
    <PostOverviewSkeleton />
    <PostOverviewSkeleton />
  </VStack>
);

export const PostStack = (props: Props) => {
  if (props.posts == null || props.total == null) return <PostStackSkeleton />;
  if (props.posts.length === 0) return <EmptyPosts />;
  return (
    <VStack spacing={6} justify="stretch" align="stretch">
      {props.posts.map((u) => (
        <Box key={u.id}>
          <PostOverview
            post={{
              ...u,
              imageURL: props.showImage ? u.imageURL : undefined,
              tags: props.showTag ? u.tags : undefined,
            }}
          />
        </Box>
      ))}
    </VStack>
  );
};
interface ConsumerProps {
  icon?: any;
  showImage?: boolean;
  showTag?: boolean;
  minimal?: boolean;
}
export const PostStackConsumer = (props: ConsumerProps) => {
  const { posts, total } = React.useContext(PostsContext);
  return <PostStack posts={posts} total={total} {...props} />;
};
