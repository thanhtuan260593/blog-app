import React from "react";
import { Avatar, VStack, HStack, Box, Icon, Flex } from "@chakra-ui/react";
import Moment from "react-moment";
import { CommentModel } from "resources/models/comment";
import { CommentListContext, CommentListProvider } from "./CommentListProvider";
import { CommentListConsumer } from "./CommentListConsumer";
import { MdTimelapse } from "react-icons/md";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { getSubComments, getSubCommentsCount } from "resources/api/comment";
import { createComment } from "resources/api/me";
import {
  CommentActionsConsumer,
  CommentContentConsumer,
  CommentCreatorConsumer,
  CommentUpdaterConsumer,
} from "./editor/CommentListConsumer";
export interface EditingComment extends CommentModel {
  isEditing: boolean;
  isReplying: boolean;
}
interface CommentMetaProps {
  createdBy?: string;
  createdAt?: string;
}

export const CommentMeta = ({ createdBy, createdAt }: CommentMetaProps) => {
  return (
    <Flex fontSize="sm" color="gray.400" justify="space-between">
      <HStack>
        <Avatar name={createdBy ?? "anonymous"} size="xs" />{" "}
        <strong>{createdBy ?? "anonymous"} </strong>
      </HStack>
      {createdAt && (
        <HStack spacing={1}>
          <Icon as={MdTimelapse} />
          <Moment fromNow>{createdAt}</Moment>
        </HStack>
      )}
    </Flex>
  );
};

interface Props {
  comment: CommentModel;
  deleteComment?: (id: number) => Promise<void>;
  updateComment?: (comment: CommentModel) => Promise<CommentModel>;
}
export const CommentBox = (props: Props) => {
  const { oidcUser } = useReactOidc();
  const { selectedComment, onSelect, deleteComment } = React.useContext(
    CommentListContext
  );
  const loadComments = React.useCallback(
    (index: number, row: number) =>
      getSubComments(props.comment.id, index, row),
    [props.comment.id]
  );
  const countComments = React.useCallback(
    () => getSubCommentsCount(props.comment.id),
    [props.comment.id]
  );
  const addComment = React.useCallback(
    async (content: string) => {
      const { id, postId } = props.comment;
      const comment = await createComment(
        { commentId: id, content, postId },
        oidcUser.access_token
      );
      return comment;
    },
    [props.comment, oidcUser]
  );
  const handleDeleteComment = React.useCallback(() => {
    if (deleteComment == null) return;
    deleteComment(props.comment.id);
  }, [deleteComment, props]);
  const handleToggleEdit = React.useCallback(() => {
    if (selectedComment && selectedComment.id === props.comment.id) {
      onSelect({ ...selectedComment, isEditing: !selectedComment.isEditing });
      return;
    }
    onSelect({ ...props.comment, isEditing: true, isReplying: false });
  }, [selectedComment, props, onSelect]);
  const handleToggleReply = React.useCallback(() => {
    if (selectedComment && selectedComment.id === props.comment.id) {
      onSelect({ ...selectedComment, isReplying: !selectedComment.isReplying });
      return;
    }
    onSelect({ ...props.comment, isEditing: false, isReplying: true });
  }, [props, onSelect, selectedComment]);
  const isEditing = React.useMemo(
    () =>
      selectedComment != null &&
      selectedComment.id === props.comment.id &&
      selectedComment.isEditing,
    [selectedComment, props]
  );
  const isReplying = React.useMemo(
    () =>
      selectedComment != null &&
      selectedComment.id === props.comment.id &&
      selectedComment.isReplying,
    [selectedComment, props]
  );
  console.log(isEditing, selectedComment);
  return (
    <VStack align="stretch">
      <Box>
        <CommentMeta {...props.comment} />
      </Box>
      <Box pl={3}>
        <Box pl={3} borderLeft="1px" borderColor="gray.400">
          <CommentUpdaterConsumer comment={props.comment} onBlur={onSelect} />
          <CommentContentConsumer comment={props.comment} />
          <Box>
            <CommentListProvider
              loadComments={loadComments}
              countComment={countComments}
              addComment={addComment}
              deleteComment={props.deleteComment}
              updateComment={props.updateComment}
              total={props.comment.commentCount}
            >
              <CommentActionsConsumer
                comment={props.comment}
                onDelete={handleDeleteComment}
                onToggleEdit={handleToggleEdit}
                onToggleReply={handleToggleReply}
                isEditing={isEditing}
              />
              {isReplying && (
                <Box>
                  <CommentMeta createdBy={oidcUser?.profile?.sub} />
                  <Box pl={3}>
                    <Box pl={3} borderLeft="1px" borderColor="gray.400">
                      <CommentCreatorConsumer
                        onBlur={onSelect}
                        autoFocus={true}
                      />
                    </Box>
                  </Box>
                </Box>
              )}
              <CommentListConsumer />
            </CommentListProvider>
          </Box>
        </Box>
      </Box>
    </VStack>
  );
};
