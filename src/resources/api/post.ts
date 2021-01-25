import { put, get, post, _delete } from "./helper";
import {
  PostProps,
  PostMetric,
  UpdatePostRequest,
  PostCountByAuthor,
} from "resources/models/post";
import { exceptions } from "./exceptions";
interface FilterParameter {
  createdBy?: string;
}
const queryString = require("query-string");

export const updatePost = async (
  id: number,
  req: UpdatePostRequest,
  token: string
) => {
  var p = await put<UpdatePostRequest>(
    `/post/${id}`,
    JSON.stringify(req),
    token
  );
  if (p === undefined) return Promise.reject(exceptions.invalidFormat);
  return p;
};

export const deletePost = async (id: number, token: string) => {
  return await _delete<void>(`/post/${id}`, undefined, token);
};

export const getPost = async (id: number) => {
  const post = await get<PostProps>(`/post/${id}`);
  if (post === undefined) return Promise.reject(exceptions.invalidFormat);
  return post;
};

export const getPostMetric = async (id: number) => {
  const metric = await get<PostMetric>(`/post/metric/${id}`);
  if (metric === undefined) return Promise.reject(exceptions.invalidFormat);
  return metric;
};

export const getPosts = async (
  offset: number,
  limit: number,
  tags: string[],
  by?: string,
  dir?: 0 | 1,
  filter?: FilterParameter
) => {
  var query = {
    offset,
    limit,
    tags,
    by,
    dir,
    createdBy: filter?.createdBy,
  };
  const url = queryString.stringifyUrl({
    url: `/post`,
    query,
  });
  const posts = await get<PostProps[]>(url);
  if (posts === undefined) return Promise.reject(exceptions.invalidFormat);
  return posts;
};

export const getCount = async (tags: string[], filter?: FilterParameter) => {
  var query = { tags, createdBy: filter?.createdBy };
  const url = queryString.stringifyUrl({
    url: `/post/count`,
    query,
  });
  const total = await get<number>(url);
  return total;
};

export const getCountByAuthors = async (limit: number, offset: number) => {
  var query = { limit, offset };
  var url = queryString.stringifyUrl({
    url: `/post/count/byAuthor`,
    query,
  });
  return await get<PostCountByAuthor[]>(url);
};

export const attachTag = async (postId: number, tag: string, token: string) => {
  return await post<void>(`/post/${postId}/tag?tag=${tag}`, undefined, token);
};
export const detachTag = async (postId: number, tag: string, token: string) => {
  return await _delete<void>(`/post/${postId}/tag?tag=${tag}`, token);
};

export const searchPosts = async (
  offset: number,
  limit: number,
  tags: string[] | undefined,
  keywords: string[] | undefined
) => {
  const query = { offset, limit, tags, keywords };
  const url = queryString.stringifyUrl({
    url: `/post/search`,
    query,
  });
  return await get<PostProps[]>(queryString.stringifyUrl({ query, url }));
};

export const countSearchedPosts = async (
  tags: string[] | undefined,
  keywords: string[] | undefined
) => {
  const url = queryString.stringifyUrl({
    url: `/post/search/count`,
    query: { tags, keywords },
  });
  return await get<number>(url);
};

export const increaseView = async (id: number) =>
  await get(`/post/${id}/increaseView`);
