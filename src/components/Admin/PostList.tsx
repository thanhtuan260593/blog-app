import React from "react";
import { PostProps } from "resources/models/PostProps";
import { PostItem } from "./PostItem";
import { LoadingPost } from "components/Post/Post";

export const AdminPostList = ({
  posts,
  reload,
}: {
  posts: PostProps[] | undefined;
  reload: () => void;
}) => {
  const handlePostDeleteItem = () => {
    reload();
  };

  if (posts === undefined) return <LoadingPost />;
  return (
    <div className="card-content">
      <div className="post-container">
        {posts.map((post) => (
          <PostItem post={post} onDeleted={handlePostDeleteItem} />
        ))}
      </div>
    </div>
  );
};
