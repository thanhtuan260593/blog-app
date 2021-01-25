import { Box, Button, HStack, Icon, useToast } from "@chakra-ui/react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BlurBox } from "components/commons/BlurBox";
import React from "react";
import { MdComment, MdDelete, MdEdit, MdReply } from "react-icons/md";
import { CommentModel } from "resources/models/comment";
import { CommentListContext } from "../CommentListProvider";
import { CommentEditor } from "./CommentEditor";
export const CommentCreatorConsumer = ({
  onBlur,
  autoFocus,
}: {
  onBlur?: () => void;
  autoFocus: boolean;
}) => {
  const { addComment } = React.useContext(CommentListContext);
  const toast = useToast();
  const handleSuccess = React.useCallback(async () => {
    toast({
      title: "Trả lời bình luận thành công",
      status: "success",
      position: "top",
    });
    onBlur && onBlur();
  }, [onBlur, toast]);
  const handleFailed = React.useCallback(
    (description: string) => {
      toast({
        title: "Trả lời bình luận không thành công",
        description,
        status: "error",
        position: "top",
      });
    },
    [toast]
  );
  return (
    <BlurBox onActuallyBlur={onBlur}>
      <CommentEditor
        autoFocus={autoFocus}
        onSave={addComment}
        onSuccess={handleSuccess}
        onFail={handleFailed}
        confirmButtonText="Gửi trả lời"
        content=""
      />
    </BlurBox>
  );
};
interface CommentProps {
  comment: CommentModel;
}
export const CommentContentConsumer = ({ comment }: CommentProps) => {
  const { selectedComment } = React.useContext(CommentListContext);
  if (
    selectedComment != null &&
    selectedComment.id === comment.id &&
    selectedComment.isEditing
  ) {
    return <></>;
  }
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      pl={2}
      bgColor="gray.50"
      rounded="md"
      overflow="hidden"
    >
      <Box>
        <MarkdownPreview>{comment.content}</MarkdownPreview>
      </Box>
    </Box>
  );
};
interface CommentUpdaterProps extends CommentProps {
  onBlur?: () => void;
}
export const CommentUpdaterConsumer = ({
  comment,
  onBlur,
}: CommentUpdaterProps) => {
  const { updateComment, selectedComment } = React.useContext(
    CommentListContext
  );
  const handleSave = React.useCallback(
    async (content: string) => {
      if (selectedComment == null || updateComment == null) throw new Error();
      return await updateComment({ ...selectedComment, content });
    },
    [selectedComment, updateComment]
  );
  if (
    selectedComment == null ||
    selectedComment.id !== comment.id ||
    !selectedComment.isEditing
  )
    return <></>;
  return (
    <BlurBox onBlur={onBlur}>
      <CommentEditor
        autoFocus
        onSave={handleSave}
        confirmButtonText="Cập nhật bình luận"
        content={selectedComment.content}
      />
    </BlurBox>
  );
};
interface ActionProps extends CommentProps {
  onToggleEdit: () => void;
  onDelete: () => void;
  onToggleReply: () => void;
}
export const CommentActionsConsumer = ({ comment, ...props }: ActionProps) => {
  const {
    comments,
    loadMore,
    selectedComment,
    clearComments,
  } = React.useContext(CommentListContext);
  const handleToggleExpand = React.useCallback(() => {
    if (comments == null) {
      loadMore();
      return;
    }
    clearComments();
  }, [clearComments, comments, loadMore]);
  const isEditing = React.useMemo(() => {
    return (
      selectedComment != null &&
      selectedComment.id === comment.id &&
      selectedComment.isEditing
    );
  }, [selectedComment, comment]);
  return (
    <Box>
      <HStack justify="space-between">
        <Box>
          {comment.commentCount > 0 && (
            <Button
              leftIcon={<Icon as={MdComment} />}
              size="sm"
              variant="link"
              onClick={handleToggleExpand}
            >
              Bình luận ({comment.commentCount})
            </Button>
          )}
        </Box>
        <HStack spacing={4}>
          {isEditing && (
            <Button
              size="sm"
              variant="link"
              colorScheme="red"
              leftIcon={<Icon as={MdDelete} />}
              onClick={props.onDelete}
            >
              Xóa
            </Button>
          )}
          {!isEditing && (
            <Button
              size="sm"
              variant="link"
              leftIcon={<Icon as={MdEdit} />}
              onClick={props.onToggleEdit}
            >
              Sửa
            </Button>
          )}
          {!isEditing && (
            <Button
              size="sm"
              variant="link"
              leftIcon={<Icon as={MdReply} />}
              onClick={props.onToggleReply}
            >
              Trả lời
            </Button>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
