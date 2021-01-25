import { Tag } from "resources/models/tag";

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
  title: string;
  subtitle: string;
  coverImageURL?: string;
}
export interface CreatePostRequest
  extends PostSettingRequest,
    PostContentRequest {
  tags: string[];
}

export interface UpdatePostRequest
  extends PostSettingRequest,
    PostContentRequest {}

export interface PostTagProps {
  tag: Tag;
}

export interface PostMetric {
  commentCount: number;
  viewCount: number;
}

export interface PostOverviewProps extends PostMetric {
  id: number;
  title: string;
  subtitle: string;
  coverImageURL: string;
  createdAt: string;
  createdBy: string;
  lastModifiedAt?: string;
  imageURL?: string;
  tags?: string[];
  commentCount: number;
  viewCount: number;
}

export interface PostProps extends PostOverviewProps {
  content: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  postAccessUsers: string[];
}

export interface PostCountByAuthor {
  author: string;
  totalPost: number;
}
