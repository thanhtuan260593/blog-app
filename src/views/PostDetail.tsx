import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostProps } from "resources/models/PostProps";
import { Callout } from "@blueprintjs/core";
import { Layout2 } from "layout/Layout2";
import { PostByTags } from "components/Post/PostByTags";
import { PostDetail, LoadingPost } from "components/Post/Post";
import { postAPI } from "resources/api/post";
type TParams = { id: string };

export const PostDetailView = ({ match }: RouteComponentProps<TParams>) => {
  const [post, setPost] = useState<PostProps>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    var id = Number(match.params.id);
    postAPI
      .getPost(id)
      .then((u) => {
        setPost(u);
      })
      .catch((e) => setError(e.message));
  }, [match.params.id]);
  if (error != null) {
    return <Callout intent="danger">{error}</Callout>;
  }

  return (
    <Layout2>
      <div className="card">
        {post ? <PostDetail post={post} /> : <LoadingPost />}
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Các bài viết liên quan</h2>
        </div>
        <PostByTags tags={post?.tags} />
      </div>
    </Layout2>
  );
};
