export interface RequestError {
  code: number;
  message: string;
}
const getError = (code: number, message: string) => {
  return { code, message } as RequestError;
};
const baseAPI = process.env.REACT_APP_API_URL;
export const request = async <T>(
  method: string,
  path: string,
  body: any,
  token?: string
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  const headers =
    token == null
      ? defaultHeaders
      : {
          ...defaultHeaders,
          Authorization: "Bearer " + token,
        };
  var response = await fetch(baseAPI + path, { method, headers, body });
  const text = await response.text();
  if (response.status !== 200) {
    return Promise.reject(getError(response.status, text));
  }
  try {
    if (text == null || text.length === 0) return {} as T;
    const res = JSON.parse(text) as T;
    return res;
  } catch (e) {
    return Promise.reject(getError(-1, "invalid-format"));
  }
};

export const get = async <T>(path: string) => request<T>("GET", path, null);
export const post = async <T>(path: string, body?: string, token?: string) =>
  request<T>("POST", path, body, token);
export const _delete = async <T>(path: string, body?: string, token?: string) =>
  request<T>("DELETE", path, body, token);
export const put = async <T>(path: string, body?: string, token?: string) => {
  return await request<T>("PUT", path, body, token);
};
