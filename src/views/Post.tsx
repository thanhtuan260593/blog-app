import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostProps } from "components/PostProp";
import { Tag, Spinner, Callout } from "@blueprintjs/core";
import RichTextEditor, { RichTextViewer } from "components/Editors/Editor";
import { postAPI } from "resources/api/post";
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
    <div>
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
      <RichTextViewer initialValue={post.content} />
    </div>
  );
};
