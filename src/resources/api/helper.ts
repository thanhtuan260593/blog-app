export const request = async <T>(method: string, path: string, body: any) => {
  const headers = {
    "Content-Type": "application/json",
  };
  var response = await fetch(path, { method, headers, body });
  if (response.status != 200) {
    var text = await response.text();
    throw new Error(text);
  }
  var res = (await response.json()) as T;
  return res;
};
export const get = async <T>(path: string) => request<T>("GET", path, null);
export const post = async <T>(path: string, body?: string) =>
  request<T>("POST", path, body);
export const _delete = async <T>(path: string, body?: string) =>
  request<T>("DELETE", path, null);
export const put = async <T>(path: string, body?: string) => {
  return await request<T>("PUT", path, body);
};
