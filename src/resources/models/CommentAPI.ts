export interface CreateCommentRequest {
  content: string;
  commentId?: number;
  postId?: number;
}

export interface UpdateCommentRequest {
  id: number;
  content: string;
}
