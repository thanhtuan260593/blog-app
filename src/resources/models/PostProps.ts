import { PostRestriction } from "resources/models/PostAPI";
import { TagProps } from "resources/models/TagProps";

export interface PostTagProps {
  tag: TagProps;
}

export interface PostMetric {
  commentCount: number;
  viewCount: number;
}

export interface PostOverviewProps extends PostMetric {
  id: number;
  subject: string;
  overview: string;
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
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

export interface PostListProps {
  posts: PostProps[];
  showImage?: boolean;
  showTag?: boolean;
}
