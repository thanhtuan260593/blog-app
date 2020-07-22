import React from "react";
import {
  PostOverviewProps,
  PostListProps,
  PostProps,
} from "components/PostProp";

import { Tag, Icon } from "@blueprintjs/core";

export const PostOverview = ({ post }: { post: PostOverviewProps }) => {
  return (
    <div className="post-card">
      <h4 className="bp3-heading post-header">
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
          <Tag icon="comment">14</Tag>
          <Tag icon="eye-open"> 2122</Tag>
          <Tag icon="heart" intent="danger">
            1
          </Tag>
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
