import { CreatePostRequest, UpdatePostRequest } from "resources/models/Post";
import { put, get, post, _delete } from "./helper";
import { PostProps } from "components/Post/PostProp";

const createPost = async (req: CreatePostRequest) => {
  return await put<PostProps>(
    `${process.env.REACT_APP_API_URL}/post`,
    JSON.stringify(req)
  );
};

const updatePost = async (id: number, req: UpdatePostRequest) => {
  return await post<UpdatePostRequest>(
    `${process.env.REACT_APP_API_URL}/post/${id}`,
    JSON.stringify(req)
  );
};

const deletePost = async (id: number) => {
  return await _delete<any>(`${process.env.REACT_APP_API_URL}/post/${id}`);
};

const getPost = async (id: number) => {
  return await get<PostProps>(`${process.env.REACT_APP_API_URL}/post/${id}`);
};

const getPosts = async (
  pageIndex: number,
  pageRows: number,
  tags: string[]
) => {
  var tagQuery = tags.reduce((pre, cur) => {
    return pre + "&tags=" + cur;
  }, "");
  return await get<PostProps[]>(
    `${process.env.REACT_APP_API_URL}/post?pageIndex=${pageIndex}&pageRows=${pageRows}${tagQuery}`
  );
};

const attachTag = async (postId: number, tag: string) => {
  return await put<PostProps>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};
const detachTag = async (postId: number, tag: string) => {
  return await _delete<PostProps>(
    `${process.env.REACT_APP_API_URL}/post/${postId}/tag?tag=${tag}`
  );
};

export const postAPI = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPosts,
  attachTag,
  detachTag,
};
