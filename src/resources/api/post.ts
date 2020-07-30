import { CreatePostRequest, UpdatePostRequest } from "resources/models/PostAPI";
import { put, get, post, _delete } from "./helper";
import { PostProps } from "resources/models/PostProps";
import { exceptions } from "./exceptions";
const queryString = require("query-string");
const createPost = async (req: CreatePostRequest) => {
  const post = await put<PostProps>(
    `${process.env.REACT_APP_API_URL}/post`,
    JSON.stringify(req)
  );
  if (post === undefined) return Promise.reject(exceptions.invalidFormat);
  return post;
};

const updatePost = async (id: number, req: UpdatePostRequest) => {
  var p = await post<UpdatePostRequest>(
    `${process.env.REACT_APP_API_URL}/post/${id}`,
    JSON.stringify(req)
  );

  if (p === undefined) return Promise.reject(exceptions.invalidFormat);
  return p;
};

const deletePost = async (id: number) => {
  return await _delete<any>(`${process.env.REACT_APP_API_URL}/post/${id}`);
};

const getPost = async (id: number) => {
  const post = await get<PostProps>(
    `${process.env.REACT_APP_API_URL}/post/${id}`
  );
  if (post === undefined) return Promise.reject(exceptions.invalidFormat);
  return post;
};

const getPosts = async (
  pageIndex: number,
  pageRows: number,
  tags: string[]
) => {
  var query: any = { pageIndex, pageRows, tags };

  const url = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_URL}/post`,
    query,
  });
  const posts = await get<PostProps[]>(url);
  if (posts === undefined) return Promise.reject(exceptions.invalidFormat);
  return posts;
};

const getCount = async (tags: string[]) => {
  var query = { tags };
  const url = queryString.stringifyUrl({
    url: `${process.env.REACT_APP_API_URL}/post/count`,
    query,
  });
  const total = await get<number>(url);
  if (total === undefined) return Promise.reject(exceptions.invalidFormat);
  return total;
};

const attachTag = async (postId: number, tag: string) => {
  return await put<void>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};
const detachTag = async (postId: number, tag: string) => {
  return await _delete<void>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};

export const postAPI = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  getCount,
  attachTag,
  detachTag,
};
