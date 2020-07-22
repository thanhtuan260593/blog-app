import { PostOverview } from "components/Post";
import { PostRestriction } from "../resources/models/Post";
import { TagProp } from "./TagProp";

export interface PostTagProp {
  tag: TagProp;
}

export interface PostOverviewProps {
  id: number;
  subject: string;
  overview: string;
  dateCreated: string;
  createdBy: string;
  imageURL?: string;
  postTags?: PostTagProp[];
}

export interface PostProps extends PostOverviewProps {
  content: string;
  canComment: boolean;
  postRestrictionType: PostRestriction;
  postAccessUsers: string[];
}

export interface PostListProps {
  posts: PostOverviewProps[];
}
