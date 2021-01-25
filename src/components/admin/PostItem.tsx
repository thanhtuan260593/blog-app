import React from "react";
import { PostProps } from "resources/models/post";
import { CommentModel } from "resources/models/comment";
import { PostMeta, PostHeader, PostSocial } from "components/post/PostOverview";
import { Button, Center, HStack, Icon } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { generateIDParamPath } from "constants/postRoutes";
import { MdDelete, MdEdit } from "react-icons/md";
import { Card, CardBody } from "components/layout/Card";
import { CommentList } from "components/comment/CommentList";
import { adminRoutes } from "constants/adminRoutes";
import { Tags } from "components/tag/Tags";
import { deletePost } from "resources/api/post";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import {
  deleteComment,
  getPostComments,
  getPostCommentsCount,
  updateComment,
} from "resources/api/comment";

export const PostItem = ({
  post,
  onDeleted,
}: {
  post: PostProps;
  onDeleted: () => void;
}) => {
  const { oidcUser } = useReactOidc();
  const [expand, setExpand] = React.useState<boolean>(false);
  const history = useHistory();
  const handleDelete = () => {
    deletePost(post.id, oidcUser.access_token).then(() => onDeleted());
  };
  const loadMore = React.useCallback(
    (index: number, size: number) => getPostComments(post.id, index, size),
    [post.id]
  );
  const countComments = React.useCallback(() => getPostCommentsCount(post.id), [
    post.id,
  ]);
  const handleDeleteComment = React.useCallback(
    async (comment: CommentModel) => {
      if (oidcUser == null) return;
      await deleteComment(comment.id, oidcUser.access_token);
    },
    [oidcUser]
  );
  const handleUpdateComment = React.useCallback(
    async (comment: CommentModel, content: string) => {
      if (oidcUser == null) return comment;
      return await updateComment(
        { id: comment.id, content },
        oidcUser.access_token
      );
    },
    [oidcUser]
  );
  return (
    <Card>
      <CardBody>
        <PostMeta
          post={post}
          extras={[
            <HStack key={1}>
              <Button
                size="sm"
                onClick={() =>
                  history.push(
                    generateIDParamPath(adminRoutes.postUpdate, post.id)
                  )
                }
                colorScheme="blue"
                variant="link"
                leftIcon={<Icon as={MdEdit} />}
              >
                Sửa
              </Button>

              <Button
                size="sm"
                variant="link"
                colorScheme="red"
                leftIcon={<Icon as={MdDelete} />}
                onClick={handleDelete}
              >
                Xóa
              </Button>
            </HStack>,
          ]}
        />
        <PostHeader post={post} />
        {post.tags && <Tags tagIds={post.tags} />}
        <PostSocial post={post} />
        {expand && (
          <CommentList
            firstLoad={expand}
            loadComments={loadMore}
            countComment={countComments}
            deleteComment={handleDeleteComment}
            updateComment={handleUpdateComment}
          />
        )}
        {post.commentCount > 0 && (
          <Center>
            <Button variant="link" onClick={() => setExpand((e) => !e)}>
              {expand ? "Thu gọn" : "Xem comment"}
            </Button>
          </Center>
        )}
      </CardBody>
    </Card>
  );
};
