import { get, put, _delete, post } from "./helper";
import { CommentProps } from "resources/models/CommentProps";
import {
  CreateCommentRequest,
  UpdateCommentRequest,
} from "resources/models/CommentAPI";
import { exceptions } from "./exceptions";
const queryString = require("query-string");
const baseURL = `${process.env.REACT_APP_API_URL}/comment`;
const getPostComments = async (
  postId: number,
  pageIndex?: number,
  pageRows?: number
) => {
  const query = { pageIndex, pageRows };
  const url = `${baseURL}/post/${postId}`;
  const comments = await get<CommentProps[]>(
    queryString.stringifyUrl({ url, query })
  );
  if (comments == null) return Promise.reject(exceptions.invalidFormat);
  return comments;
};

const getPostCommentsCount = async (postId: number) => {
  const count = await get<number>(`${baseURL}/post/${postId}/count`);
  if (count == null) return Promise.reject(exceptions.invalidFormat);
  return count;
};

const getSubComments = async (
  commentId: number,
  pageIndex?: number,
  pageRows?: number
) => {
  const query = { pageIndex, pageRows };
  const url = `${baseURL}/${commentId}/comments`;
  const comments = await get<CommentProps[]>(
    queryString.stringifyUrl({ url, query })
  );
  if (comments == null) return Promise.reject(exceptions.invalidFormat);
  return comments;
};

const getSubCommentsCount = async (commentId: number) => {
  const count = await get<number>(`${baseURL}/${commentId}/comments/count`);
  if (count == null) return Promise.reject(exceptions.invalidFormat);
  return count;
};

const createComment = async (comment: CreateCommentRequest) => {
  await put(`${baseURL}`, JSON.stringify(comment));
};

const updateComment = async (comment: UpdateCommentRequest) => {
  await post(`${baseURL}/${comment.id}`, JSON.stringify(comment));
};

const deleteComment = async (commentId: number) => {
  await _delete(`${baseURL}/${commentId}`);
};

export const commentAPI = {
  getPostComments,
  getPostCommentsCount,
  getSubComments,
  getSubCommentsCount,
  createComment,
  updateComment,
  deleteComment,
};
