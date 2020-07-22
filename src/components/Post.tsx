import React from "react";
import {
  PostOverviewProps,
  PostListProps,
  PostProps,
} from "components/PostProp";

import { Tag, Icon, Colors } from "@blueprintjs/core";

export const PostOverview = ({ post }: { post: PostOverviewProps }) => {
  return (
    <div className="post-card">
      <h4 className="bp3-heading post-header" style={{ color: Colors.BLUE1 }}>
        {post.subject}{" "}
        {post.postTags &&
          post.postTags.map((u) => (
            <Tag className="tag-item" key={u.tag.value}>
              {u.tag.value}
            </Tag>
          ))}
      </h4>
      {post.imageURL && <img src={post.imageURL} style={{ width: "100%" }} />}
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <Icon icon="comment" color={Colors.GRAY5} /> <b>14</b> {"  "}{" "}
          <Icon icon="eye-open" color={Colors.GRAY5} /> <b>2122</b>
          {"  "}
          <Icon icon="heart" color={Colors.GRAY5} /> <b>1</b>
        </div>
        <i className="post-meta">
          {post.createdBy} -{" "}
          {new Date(post.dateCreated).toLocaleDateString("vi-VN")}
        </i>
      </div>
    </div>
  );
};

export const PostList = (props: PostListProps) => {
  return (
    <div className="post-container">
      {props.posts.map((u) => (
        <PostOverview key={u.id} post={u} />
      ))}
    </div>
  );
};

export const PostDetail = (post: PostProps) => {
  return (
    <div className="post-card">
      <i className="post-meta">
        {post.createdBy} -{" "}
        {new Date(post.dateCreated).toLocaleDateString("vi-VN")}
      </i>
      <h4 className="bp3-heading post-header">
        {post.subject}{" "}
        {post.postTags &&
          post.postTags.map((u) => (
            <Tag className="tag-item" key={u.tag.value}>
              {u}
            </Tag>
          ))}
      </h4>
      <hr />
      {post.content}
    </div>
  );
};
