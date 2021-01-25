import React from "react";
import { CommentModel } from "resources/models/comment";
import { CommentListProvider } from "./CommentListProvider";
import { CommentListConsumer } from "./CommentListConsumer";

interface Props {
  loadComments: (index: number, row: number) => Promise<CommentModel[]>;
  countComment: () => Promise<number>;
  addComment?: (content: string) => Promise<CommentModel>;
  deleteComment?: (id: number) => Promise<void>;
  updateComment: (comment: CommentModel) => Promise<CommentModel>;
  firstLoad?: boolean;
  canModifyComment: (comment: CommentModel) => boolean;
}
export const CommentList = (props: Props) => (
  <CommentListProvider {...props}>
    <CommentListConsumer firstLoad={props.firstLoad} />
  </CommentListProvider>
);
