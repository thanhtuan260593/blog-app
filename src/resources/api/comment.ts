import { get, _delete, put } from "./helper";
import { CommentModel, UpdateCommentRequest } from "resources/models/comment";
import { exceptions } from "./exceptions";
const queryString = require("query-string");
const baseURL = `/comment`;
export const getPostComments = async (
  postId: number,
  offset?: number,
  limit?: number
) => {
  const query = { offset, limit };
  const url = `${baseURL}/post/${postId}`;
  const comments = await get<CommentModel[]>(
    queryString.stringifyUrl({ url, query })
  );
  if (comments == null) return Promise.reject(exceptions.invalidFormat);
  return comments;
};

export const getPostCommentsCount = async (postId: number) => {
  const count = await get<number>(`${baseURL}/post/${postId}/count`);
  if (count == null) return Promise.reject(exceptions.invalidFormat);
  return count;
};

export const getSubComments = async (
  commentId: number,
  offset?: number,
  limit?: number
) => {
  const query = { offset, limit };
  const url = `${baseURL}/${commentId}/comments`;
  const comments = await get<CommentModel[]>(
    queryString.stringifyUrl({ url, query })
  );
  if (comments == null) return Promise.reject(exceptions.invalidFormat);
  return comments;
};

export const getSubCommentsCount = async (commentId: number) => {
  const count = await get<number>(`${baseURL}/${commentId}/comments/count`);
  if (count == null) return Promise.reject(exceptions.invalidFormat);
  return count;
};

export const updateComment = async (
  comment: UpdateCommentRequest,
  token: string
) => {
  return await put<CommentModel>(
    `/comment/${comment.id}`,
    JSON.stringify(comment),
    token
  );
};

export const deleteComment = async (commentId: number, token: string) => {
  await _delete(`/comment/${commentId}`, undefined, token);
};
