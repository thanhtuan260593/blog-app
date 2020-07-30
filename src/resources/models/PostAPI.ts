export enum PostRestriction {
  NONE = 0,
  ALLOW_USERS = 1,
}
export interface CreatePostRequest {
  content: string;
  subject: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  accessUsers: string[];
  tags: string[];
}

export interface UpdatePostRequest {
  content: string;
  subject: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  accessUsers: string[];
}
