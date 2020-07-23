import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostProps } from "components/Post/PostProp";
import { Tag, Spinner, Callout } from "@blueprintjs/core";
import RichTextEditor, { RichTextViewer } from "components/Editors/Editor";
import { postAPI } from "resources/api/post";
import { Layout3_7 } from "layout/Layout3_7";
type TParams = { id: string };

export const PostView = ({ match }: RouteComponentProps<TParams>) => {
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
  }, []);
  if (error != null) {
    return <Callout intent="danger">{error}</Callout>;
  }
  if (post == null) {
    return <Spinner />;
  }
  return (
    <Layout3_7>
      <div>
        <h2>
          {post.subject}{" "}
          {post.tags &&
            post.tags.map((u) => (
              <Tag className="tag-item" key={u}>
                {u}
              </Tag>
            ))}
        </h2>
        <RichTextViewer initialValue={post.content} />
        <div style={{ textAlign: "right" }}>
          <i className="post-meta">
            {post.createdBy} -{" "}
            {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </i>
        </div>
      </div>
      <div>
        <h2>Các bài viết liên quan</h2>
      </div>
    </Layout3_7>
  );
};
