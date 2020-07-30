import React, { useCallback, useState } from "react";
import { Button } from "@blueprintjs/core";
import { CommentProps } from "resources/models/CommentProps";
import { RichTextViewer } from "components/Editors/Editor";
import { CommentList } from "./CommentList";
import { commentAPI } from "resources/api/comment";
import Avatar from "react-avatar";
import { CreateComment } from "./CommentEditor";

export const CommentContent = (props: CommentProps) => {
  return (
    <div className="comment-content">
      <RichTextViewer initialValue={props.content} />
    </div>
  );
};

export const CommentMeta = (props: CommentProps) => {
  return (
    <div className="post-meta">
      <Avatar
        name={props.createdBy}
        size="20"
        round
        textSizeRatio={1.5}
        textMarginRatio={0.1}
      />{" "}
      <i>
        <strong>Đăng bởi {props.createdBy} </strong> - Vào lúc{" "}
        {new Date(props.createdAt).toLocaleString("vi-VN")}
      </i>{" "}
    </div>
  );
};

export const CommentActions = (props: CommentProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [forceLoad, setForceLoad] = useState<() => Promise<CommentProps[]>>();
  const loadSubComments = useCallback(
    (pageIndex: number, pageRows: number) => {
      return commentAPI.getSubComments(props.id, pageIndex, pageRows);
    },
    [props.id]
  );
  const countSubComments = useCallback(() => {
    return commentAPI.getSubCommentsCount(props.id);
  }, [props.id]);
  const post = useCallback(
    (content: string) =>
      commentAPI.createComment({ content, commentId: props.id }),
    [props.id]
  );
  const onSuccess = useCallback(() => {
    setShowEditor(false);
    setForceLoad(() => () => commentAPI.getSubComments(props.id, 0, 10));
  }, [props.id]);
  const onFail = useCallback((err) => console.log(err), []);
  return (
    <div className="comment-action">
      <div className="comment-action-item">
        <Button
          small
          minimal
          icon="comment"
          onClick={() => setShowEditor((cur) => !cur)}
        >
          Bình luận
        </Button>
      </div>
      <div className="sub-comment">
        <CommentList
          forceLoad={forceLoad}
          load={loadSubComments}
          count={countSubComments}
        />
        {showEditor && (
          <CreateComment
            postCallback={post}
            onSuccess={onSuccess}
            onFail={onFail}
          />
        )}
      </div>
    </div>
  );
};

export const Comment = (props: CommentProps) => {
  return (
    <div className="comment">
      <div className="comment-wrapper"></div>
      <CommentMeta {...props} />
      <CommentContent {...props} />
      <CommentActions {...props} />
    </div>
  );
};
