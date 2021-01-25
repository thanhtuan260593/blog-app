import {
  CreateCommentRequest,
  UpdateCommentRequest,
  CommentModel,
} from "resources/models/comment";
import {
  CreatePostRequest,
  PostProps,
  UpdatePostRequest,
} from "resources/models/post";
import { exceptions } from "./exceptions";
import { post, put, _delete } from "./helper";

export const createPost = async (req: CreatePostRequest, token: string) => {
  const postData = await post<PostProps>(
    `/me/post`,
    JSON.stringify(req),
    token
  );
  if (postData === undefined) return Promise.reject(exceptions.invalidFormat);
  return postData;
};
export const updatePost = async (
  id: number,
  req: UpdatePostRequest,
  token: string
) => {
  var p = await put<UpdatePostRequest>(
    `/me/post/${id}`,
    JSON.stringify(req),
    token
  );
  if (p === undefined) return Promise.reject(exceptions.invalidFormat);
  return p;
};
export const deletePost = async (id: number, token: string) => {
  return await _delete<void>(`/me/post/${id}`, undefined, token);
};
export const attachTag = async (postId: number, tag: string, token: string) => {
  return await post<void>(`/post/${postId}/tag?tag=${tag}`, undefined, token);
};
export const detachTag = async (postId: number, tag: string, token: string) => {
  return await _delete<void>(
    `/post/${postId}/tag?tag=${tag}`,
    undefined,
    token
  );
};
export const createComment = async (
  comment: CreateCommentRequest,
  token: string
) => {
  return await post<CommentModel>(
    `/me/comment`,
    JSON.stringify(comment),
    token
  );
};

export const updateComment = async (
  comment: UpdateCommentRequest,
  token: string
) => {
  return await put<CommentModel>(
    `/me/comment/${comment.id}`,
    JSON.stringify(comment),
    token
  );
};
export const deleteComment = async (commentId: number, token: string) => {
  await _delete(`/me/comment/${commentId}`, undefined, token);
};
