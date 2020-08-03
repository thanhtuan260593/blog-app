import React from "react";
import { PostProps } from "resources/models/PostProps";
import { PostMeta, PostHeader, PostSocial } from "components/Post/Post";
import { Button } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { routes } from "constants/routes";
import { postAPI } from "resources/api/post";

export const PostItem = ({
  post,
  onDeleted,
}: {
  post: PostProps;
  onDeleted: () => void;
}) => {
  const handleDelete = () => {
    postAPI.deletePost(post.id).then(() => onDeleted());
  };
  return (
    <div className="post-item">
      <PostMeta
        post={post}
        extras={[
          <>
            <Link to={`${routes.postUpdate.getPath(post.id)}`}>
              <Button small minimal intent="primary" icon="edit" />
            </Link>
            <Button
              small
              minimal
              intent="danger"
              icon="delete"
              onClick={handleDelete}
            />
          </>,
        ]}
      />

      <PostHeader post={post} />
      <PostSocial post={post} />
    </div>
  );
};
