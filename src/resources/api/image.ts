import { RequestError } from "./helper";
const base = process.env.REACT_APP_IMAGE_API_URL;
export const UnauthorizeError: RequestError = {
  code: 401,
  message: "unauthorized",
};
async function request<T>(
  method: string,
  path: string,
  body?: BodyInit,
  token?: string,
  extraHeaders?: { [key: string]: string }
): Promise<T> {
  const url = base + path;
  const baseHeaders = extraHeaders
    ? extraHeaders
    : {
        "Content-Type": "application/json",
      };
  const headers = token
    ? { ...baseHeaders, Authorization: `Bearer ${token}` }
    : baseHeaders;
  const response = await fetch(url, { method, headers, body });
  const text = await response.text();
  if (response.ok) {
    if (text == null || text === "") return {} as T;
    return JSON.parse(text);
  }
  if (response.status === 401) return Promise.reject(UnauthorizeError);
  if (text == null || text === "")
    return Promise.reject({ Err: response.statusText });
  return Promise.reject(JSON.parse(text) as RequestError);
}
export interface ImageInfo {
  fullname: string;
  id: number;
  tags: string[];
  by?: string;
  at?: string;
  width: number;
  height: number;
  diskSize: number;
}
export const upload = async (name: string, data: File, token: string) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("name", name);
  const image = await request<ImageInfo>(
    "POST",
    `/admin/image`,
    formData,
    token,
    {}
  );
  if (image === undefined) {
    return Promise.reject("invalid-data");
  }
  image.tags = [];
  return image;
};
