import { get, put } from "./helper";
import { TagProps } from "resources/models/TagProps";

const getTags = async (search: string) => {
  const res = await get<TagProps[]>(
    `${process.env.REACT_APP_API_URL}/tag?search=${search}`
  );
  if (res === undefined) return [] as TagProps[];
  return res;
};

const putTag = async (tag: string) => {
  return await put<TagProps>(`${process.env.REACT_APP_API_URL}/tag?tag=${tag}`);
};

export const tagAPI = { get: getTags, put: putTag };
