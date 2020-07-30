import React from "react";
import { PostOverview } from "./Post";
import { PostListProps } from "resources/models/PostProps";

export const PostList = (props: PostListProps) => {
  return (
    <div className="post-container">
      {props.posts.map((u) => (
        <div className="post-item" key={u.id}>
          <PostOverview
            post={{
              ...u,
              imageURL: props.showImage ? u.imageURL : undefined,
              tags: props.showTag ? u.tags : undefined,
            }}
          />
        </div>
      ))}
    </div>
  );
};
