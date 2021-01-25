import { Button, Icon } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { CommentListContext } from "./CommentListProvider";

export const DeleteCommentButton = ({ id }: { id: number }) => {
  const { deleteComment } = React.useContext(CommentListContext);
  const handleDeleteComment = React.useCallback(() => {
    if (deleteComment == null) return;
    deleteComment(id);
  }, [deleteComment, id]);
  if (deleteComment == null) return <></>;
  return (
    <Button
      size="sm"
      variant="link"
      colorScheme="red"
      leftIcon={<Icon as={MdDelete} />}
      onClick={handleDeleteComment}
    >
      Xóa
    </Button>
  );
};
