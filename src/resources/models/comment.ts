export interface CommentModel {
  id: number;
  content: string;
  postId?: number;
  commentId?: number;
  createdBy: string;
  createdAt: string;
  lastModifiedAt: Date;
  commentCount: number;
}

export interface CreateCommentRequest {
  content: string;
  commentId?: number;
  postId?: number;
}

export interface UpdateCommentRequest {
  id: number;
  content: string;
}
