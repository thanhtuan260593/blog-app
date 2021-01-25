import { get, post, put, _delete } from "./helper";
import { Tag } from "resources/models/tag";
import queryString from "query-string";
export const batchTags = async (tags: string[]) => {
  const query = { tags };
  const url = queryString.stringifyUrl({
    url: `/tag/batch`,
    query,
  });
  return await get<Tag[]>(url);
};

export const getTags = async (
  limit: number,
  offset: number,
  search?: string
) => {
  const query = { limit, offset, search };
  const url = queryString.stringifyUrl({
    url: `/tag`,
    query,
  });
  const res = await get<Tag[]>(url);

  return res;
};

export const countTags = async () => await get<number>("/tag/count");

export const addTag = async (tag: string, token: string) => {
  return await post<Tag>(`/tag?tag=${tag}`, token);
};
export const getRelatedTags = async (
  tag: string,
  limit: number,
  offset: number
) => {
  const query = { tag, limit, offset };
  const url = queryString.stringifyUrl({
    url: "/tag/related",
    query,
  });
  return await get<string[]>(url);
};
export const updateTag = async (slug: string, label: string, token: string) =>
  await put<Tag>(`/tag`, JSON.stringify({ slug, label }), token);
export const deleteTag = async (slug: string, token: string) =>
  await _delete<void>(`/tag/${slug}`, undefined, token);
