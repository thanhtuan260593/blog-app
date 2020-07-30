export interface CommentProps {
  id: number;
  content: string;
  postId?: number;
  commentId?: number;
  createdBy: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
