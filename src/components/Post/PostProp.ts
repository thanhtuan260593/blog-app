import { PostOverview } from "components/Post/Post";
import { PostRestriction } from "../../resources/models/Post";
import { TagProp } from "../TagProp";

export interface PostTagProp {
  tag: TagProp;
}

export interface PostOverviewProps {
  id: number;
  subject: string;
  overview: string;
  createdAt: string;
  createdBy: string;
  modifiedAt?: string;
  imageURL?: string;
  tags?: string[];
}

export interface PostProps extends PostOverviewProps {
  content: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  postAccessUsers: string[];
}

export interface PostListProps {
  posts: PostOverviewProps[];
  showImage?: boolean;
  showTag?: boolean;
}
