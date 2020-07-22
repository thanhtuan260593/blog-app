import { get, put } from "./helper";
import { TagProp } from "components/TagProp";

const getTags = async (search: string) => {
  return await get<TagProp[]>(
    `${process.env.REACT_APP_API_URL}/tag?search=${search}`
  );
};

const putTag = async (tag: string) => {
  return await put<TagProp>(`${process.env.REACT_APP_API_URL}/tag?tag=${tag}`);
};

export const tagAPI = { get: getTags, put: putTag };
