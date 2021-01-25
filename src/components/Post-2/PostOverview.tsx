import React from "react";
import { PostProps } from "resources/models/post";
import {
  Icon,
  Box,
  Heading,
  HStack,
  Flex,
  Spacer,
  Skeleton,
  Image,
} from "@chakra-ui/react";
import { MdComment, MdRemoveRedEye, MdTimelapse } from "react-icons/md";
import { Link } from "react-router-dom";
import { PostContent } from "./PostContent";
import {
  Card,
  CardBody,
  CardBodySkeleton,
  CardHeader,
  CardHeaderSkeleton,
} from "components/layout/Card";
import Moment from "react-moment";
import { fooPost } from "constants/foo";
import { generateIDParamPath, postRoutes } from "constants/postRoutes";
import { Tags } from "components/tag/Tags";
import { routes } from "constants/routes";
export const LoadingPost = () => {
  return (
    <Card>
      <CardHeaderSkeleton />
      <CardBodySkeleton height={768} />
    </Card>
  );
};

export const PostHeader = ({ post }: { post: PostProps }) => {
  return (
    <>
      <Box>
        <Link to={generateIDParamPath(postRoutes.postDetail, post.id)}>
          <Heading size="sm">{post.title}</Heading>
        </Link>
      </Box>
    </>
  );
};
export const PostMeta = (props: {
  post: PostProps;
  extras?: [JSX.Element];
  size?: string;
  avatarSize?: string;
}) => {
  return (
    <Flex fontWeight="thin" fontSize={props.size}>
      <HStack color="gray.500" spacing={4}>
        <HStack spacing={1}>
          <Link to={routes.user.getPath(props.post.createdBy)}>
            {props.post.createdBy}{" "}
          </Link>
        </HStack>
        <HStack spacing={1}>
          <Icon as={MdTimelapse} />
          <Moment fromNow>{props.post.createdAt}</Moment>
        </HStack>
      </HStack>
      {props.extras && (
        <>
          <Spacer />
          <Box>{props.extras}</Box>
        </>
      )}
    </Flex>
  );
};

export const PostSocial = ({ post }: { post: PostProps }) => {
  return (
    <HStack color="gray.400" fontSize="sm">
      <HStack spacing={1}>
        <Icon as={MdComment} /> <b>{post.commentCount}</b>
      </HStack>
      <HStack spacing={1}>
        <Icon as={MdRemoveRedEye} /> <b>{post.viewCount}</b>
      </HStack>
    </HStack>
  );
};
export const PostOverviewSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton>{fooPost.title}</Skeleton>
    </CardHeader>
    <CardBody>
      <Skeleton>{fooPost.content}</Skeleton>
    </CardBody>
  </Card>
);
export const PostOverview = ({ post }: { post: PostProps }) => {
  return (
    <Card>
      <CardHeader>
        <PostHeader post={post} />
        <PostMeta size="sm" avatarSize="xs" post={post} />
      </CardHeader>
      <CardBody>
        <Tags tagIds={post.tags} />
        <Box h={1} />
        {post.coverImageURL && (
          <Image width="100%" src={post.coverImageURL} alt={post.title} />
        )}
        {post.subtitle != null && post.subtitle.length > 0 && (
          <PostContent>{post.subtitle}</PostContent>
        )}
        <PostSocial post={post} />
      </CardBody>
    </Card>
  );
};
