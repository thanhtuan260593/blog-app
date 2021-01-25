import React from "react";
import { PostMeta } from "./PostOverview";
import { PostProps } from "resources/models/post";
import {
  Box,
  Flex,
  Heading,
  HStack,
  StackDivider,
  VStack,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fooPost } from "constants/foo";
import { generateIDParamPath, postRoutes } from "constants/postRoutes";
import { Card, CardBody } from "components/layout/Card";
import { EmptyPosts } from "./EmptyPost";
import { PostsContext } from "./PostProvider";

export const PostListSkeleton = () => (
  <VStack
    justify="stretch"
    align="stretch"
    spacing={0}
    divider={<StackDivider color="gray.200" />}
  >
    <PostListItemSkeleton />
    <PostListItemSkeleton />
    <PostListItemSkeleton />
    <PostListItemSkeleton />
    <PostListItemSkeleton />
    <PostListItemSkeleton />
  </VStack>
);
export const PostListItemSkeleton = () => (
  <Card>
    <CardBody>
      <Flex direction="row">
        <Box flexGrow={0} flexShrink={0} py={2} pr={4}>
          <Skeleton>
            <Icon h="100%" boxSize="32px" as={FaReact} />
          </Skeleton>
        </Box>
        <Box flex={1}>
          <Flex direction="column" h="100%" justify="center" py={2}>
            <Skeleton>
              <Heading size="xs">{fooPost.title}</Heading>
            </Skeleton>
            <Skeleton>
              <HStack fontSize="xs" color="gray.400">
                <PostMeta avatarSize="2xs" post={fooPost} />
              </HStack>
            </Skeleton>
          </Flex>
        </Box>
      </Flex>
    </CardBody>
  </Card>
);
export const PostListItem = ({ post }: { post: PostProps }) => {
  return (
    <>
      <Flex direction="column" h="100%" justify="center" py={2}>
        <Link to={generateIDParamPath(postRoutes.postDetail, post.id)}>
          <Heading size="xs">{post && post.title}</Heading>
        </Link>
        <HStack fontSize="xs" color="gray.400">
          <PostMeta avatarSize="2xs" post={post} />
        </HStack>
      </Flex>
    </>
  );
};
export interface Props {
  posts?: PostProps[];
  total?: number;
  icon?: any;
  showImage?: boolean;
  showTag?: boolean;
  minimal?: boolean;
}
export const PostList = (props: Props) => {
  if (props.posts == null || props.total == null) return <PostListSkeleton />;
  if (props.posts.length === 0) return <EmptyPosts />;
  return (
    <VStack
      justify="stretch"
      align="stretch"
      spacing={0}
      divider={<StackDivider color="gray.200" />}
    >
      {props.posts.map((u) => (
        <Flex key={u.id} direction="row">
          {props.icon && (
            <Box flexGrow={0} flexShrink={0} py={2} pr={4}>
              <Icon h="100%" boxSize="32px" as={props.icon} />
            </Box>
          )}
          <Box flex={1}>
            <PostListItem
              key={u.id}
              post={{
                ...u,
                imageURL: props.showImage ? u.imageURL : undefined,
                tags: props.showTag ? u.tags : undefined,
              }}
            />
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};
interface PostListConsumerProps {
  icon?: any;
  showImage?: boolean;
  showTag?: boolean;
  minimal?: boolean;
}
export const PostListConsumer = (props: PostListConsumerProps) => {
  const { posts, total } = React.useContext(PostsContext);
  return <PostList posts={posts} total={total} {...props} />;
};
