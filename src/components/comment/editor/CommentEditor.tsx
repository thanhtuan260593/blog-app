import React, { useState } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { CommentModel } from "resources/models/comment";
import { View } from "./View";

interface Props {
  autoFocus?: boolean;
  commentId?: number;
  onSave?: (content: string) => Promise<CommentModel>;
  onSuccess?: (comment: CommentModel) => void;
  onFail?: (message: string) => void;
  onBlur?: (value: string | undefined) => void;
  confirmButtonText: string;
  content: string;
}
export const CommentEditor = (props: Props) => {
  const [content, setContent] = useState<string>(props.content);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (props.onSave == null) return;
    if (content == null || content.length < 8) {
      setMessage(
        "Nội dung bình luận không hợp lệ, nội dung bình luận phải có ít nhất 8 kí tự"
      );
      return;
    }
    if (content.length > 1024) {
      setMessage("Nội dung bình luận không quá 1024 ký tự");
    }
    try {
      setLoading(true);
      const comment = await props.onSave(content);
      setContent("");
      props.onSuccess && props.onSuccess(comment);
    } catch (err: any) {
      props.onFail && props.onFail(err.message);
    } finally {
      setLoading(false);
    }
  };
  const onBlur = React.useCallback(() => {
    props.onBlur && props.onBlur(content);
  }, [props, content]);
  const handleContentChange = (content: string) => {
    setContent(content);
    setMessage(undefined);
  };
  return (
    <View
      value={content}
      onChange={handleContentChange}
      autoFocus={props.autoFocus}
      onBlur={onBlur}
      message={message}
      onMessageChange={setMessage}
      confirmButton={
        <Button
          isLoading={loading}
          colorScheme="blue"
          leftIcon={<Icon as={MdSend} />}
          onClick={handleSend}
        >
          {props.confirmButtonText}
        </Button>
      }
    />
  );
};
