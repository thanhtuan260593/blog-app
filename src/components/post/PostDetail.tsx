import React, { useCallback } from "react";
import { PostProps } from "resources/models/post";
import {
  Icon,
  Button,
  Box,
  Flex,
  Divider,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { PostContent } from "./PostContent";
import {
  Card,
  CardBody,
  CardBodySkeleton,
  CardHeader,
  CardHeaderSkeleton,
} from "components/layout/Card";
import { generateIDParamPath, postRoutes } from "constants/postRoutes";
import { Tags } from "components/tag/Tags";
import { CommentListConsumer } from "components/comment/CommentListConsumer";
import { CommentListProvider } from "components/comment/CommentListProvider";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { getPostComments, getPostCommentsCount } from "resources/api/comment";
import { createComment, deleteComment, updateComment } from "resources/api/me";
import { PostMeta, PostSocial } from "./PostOverview";
import { CommentCreatorConsumer } from "components/comment/editor/CommentListConsumer";
import { CommentModel } from "resources/models/comment";
export const LoadingPost = () => {
  return (
    <Card>
      <CardHeaderSkeleton />
      <CardBodySkeleton height={768} />
    </Card>
  );
};

const PostCommentSection = () => {
  return (
    <>
      <CommentCreatorConsumer autoFocus={false} />
      <CommentListConsumer firstLoad />
    </>
  );
};

interface PostDetailProps {
  post: PostProps;
  reloadMetric: () => void;
}

export const PostDetail = ({ post, reloadMetric }: PostDetailProps) => {
  const { oidcUser } = useReactOidc();
  const loadComments = useCallback(
    (pageIndex: number, pageRows: number) => {
      return getPostComments(post.id, pageIndex, pageRows);
    },
    [post.id]
  );
  const handleAddComment = useCallback(
    (content: string) => {
      return createComment({ postId: post.id, content }, oidcUser.access_token);
    },
    [post, oidcUser]
  );

  const countComments = useCallback(() => {
    return getPostCommentsCount(post.id);
  }, [post.id]);
  const handleUpdateComment = useCallback(
    async (comment: CommentModel) =>
      await updateComment(comment, oidcUser.access_token),
    [oidcUser]
  );
  const handleDeleteComment = useCallback(
    async (id: number) => await deleteComment(id, oidcUser.access_token),
    [oidcUser]
  );

  return (
    <VStack align="stretch" justify="stretch">
      <Box>
        <Card>
          <CardHeader>{post.title}</CardHeader>
          <CardBody>
            <Box pb={4}>
              {post.tags ? <Tags size="lg" tagIds={post.tags} /> : <></>}
            </Box>
            <PostContent>{post.content}</PostContent>
            <Flex justify="flex-end" pt={4}>
              <PostMeta avatarSize="xs" post={post} />
            </Flex>
            <Divider my={2} />
            <Flex direction="row" alignItems="baseline">
              <PostSocial post={post} />
              <Spacer />
              {oidcUser && oidcUser.profile.sub === post.createdBy && (
                <Box>
                  <Link
                    to={generateIDParamPath(postRoutes.postUpdate, post.id)}
                  >
                    <Button
                      aria-label="update-post"
                      colorScheme="blue"
                      variant="link"
                      leftIcon={<Icon as={MdEdit} />}
                    >
                      Edit
                    </Button>
                  </Link>
                </Box>
              )}
            </Flex>
          </CardBody>
        </Card>
      </Box>
      <CommentListProvider
        loadComments={loadComments}
        countComment={countComments}
        addComment={handleAddComment}
        updateComment={handleUpdateComment}
        deleteComment={handleDeleteComment}
      >
        <PostCommentSection />
      </CommentListProvider>
    </VStack>
  );
};
