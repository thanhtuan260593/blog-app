export enum PostRestriction {
  NONE = 0,
  ALLOW_USERS = 1,
}
export interface PostSettingRequest {
  canComment: boolean;
  postRestrictionType: PostRestriction;
  accessUsers: string[];
}
export interface PostContentRequest {
  content: string;
  subject: string;
}
export interface CreatePostRequest
  extends PostSettingRequest,
    PostContentRequest {
  tags: string[];
}

export interface UpdatePostRequest
  extends PostSettingRequest,
    PostContentRequest {}
