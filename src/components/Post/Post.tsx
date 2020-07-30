import React, { useCallback, useState } from "react";
import { PostProps } from "resources/models/PostProps";

import {
  Tag,
  Icon,
  Colors,
  Button,
  Classes,
  AnchorButton,
} from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { CommentList } from "components/Comment/CommentList";
import { commentAPI } from "resources/api/comment";
import { RichTextViewer } from "components/Editors/Editor";
import Avatar from "react-avatar";
import { CreateComment } from "components/Comment/CommentEditor";
import { CommentProps } from "resources/models/CommentProps";

export const LoadingPost = () => {
  return (
    <div className="post-container">
      <div className="post-card">
        <div
          className={`post-header ${Classes.SKELETON}`}
          style={{ marginBottom: "20px", height: "20px", width: "100%" }}
        ></div>
        <div
          className={`post-content ${Classes.SKELETON}`}
          style={{ marginBottom: "20px", height: "400px", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export const PostHeader = ({ post }: { post: PostProps }) => {
  return (
    <Link to={post ? `/post/${post.id}` : ""}>
      <div className="post-header">{post && post.subject}</div>
    </Link>
  );
};
export const PostMeta = (props: { post: PostProps; minimal?: boolean }) => {
  if (props.post === undefined)
    return (
      <div
        style={{ width: "100%", height: "30px" }}
        className={Classes.SKELETON}
      ></div>
    );
  return (
    <div className="post-meta">
      <Avatar
        name={props.post.createdBy}
        size="20"
        round
        textSizeRatio={1.5}
        textMarginRatio={0.1}
      />{" "}
      <i>
        <strong>
          {props.minimal ? "" : "Đăng bởi"} {props.post.createdBy}{" "}
        </strong>{" "}
        - {props.minimal ? "" : "Vào lúc"}{" "}
        {new Date(props.post.createdAt).toLocaleDateString("vi-VN")}
      </i>{" "}
      {props.post.tags &&
        props.post.tags.map((u) => (
          <Tag className="tag-item" intent="primary" key={u}>
            {u}
          </Tag>
        ))}
    </div>
  );
};

const PostSocial = ({ post }: { post: PostProps }) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="post-social" style={{ flexGrow: 1 }}>
        <div className="post-social-item">
          <Icon icon="comment" color={Colors.GRAY5} /> <b>14</b>
        </div>
        <div className="post-social-item">
          <Icon icon="eye-open" color={Colors.GRAY5} /> <b>2122</b>
        </div>
        <div className="post-social-item">
          <Icon icon="heart" color={Colors.GRAY5} /> <b>1</b>
        </div>
      </div>
    </div>
  );
};

const PostContent = ({ post }: { post: PostProps }) => {
  return (
    <div className="post-content">
      <RichTextViewer initialValue={post.content} />
    </div>
  );
};

export const PostOverview = ({ post }: { post: PostProps }) => {
  return (
    <>
      <PostMeta post={post} minimal />

      <PostHeader post={post} />
      {post && post.imageURL && (
        <img src={post.imageURL} alt={post.subject} style={{ width: "100%" }} />
      )}
      <PostSocial post={post} />
    </>
  );
};

export const PostDetail = ({ post }: { post: PostProps }) => {
  const [forceLoad, setForceLoad] = useState<() => Promise<CommentProps[]>>();
  const loadComments = useCallback(
    (pageIndex: number, pageRows: number) => {
      return commentAPI.getPostComments(post.id, pageIndex, pageRows);
    },
    [post.id]
  );
  const countComments = useCallback(() => {
    return commentAPI.getPostCommentsCount(post.id);
  }, [post.id]);
  const postComment = useCallback(
    (content: string) => {
      return commentAPI.createComment({
        postId: post.id,
        content,
      });
    },
    [post.id]
  );
  const loadLastComments = () => {
    if (!post) return;
    setForceLoad(() => () => commentAPI.getPostComments(post.id, 0, 10));
  };

  if (post == null) return <LoadingPost />;

  return (
    <div className="post-container">
      <div className="post-card">
        <PostMeta post={post} />
        <PostHeader post={post} />
        <PostContent post={post} />
        {post && (
          <div style={{ display: "flex" }}>
            <PostSocial post={post} />
            <div style={{ flexGrow: 1, textAlign: "right" }}>
              <AnchorButton
                href={`/post/update/${post.id}`}
                icon="edit"
                intent="primary"
                small
                minimal
              />

              <Button icon="trash" intent="danger" small minimal />
            </div>
          </div>
        )}
        <hr />
        {post && (
          <CreateComment
            postId={post.id}
            postCallback={postComment}
            onSuccess={loadLastComments}
            onFail={(err) => console.log(err)}
          />
        )}
        {post && (
          <CommentList
            forceLoad={forceLoad}
            initialLoad
            load={loadComments}
            count={countComments}
          />
        )}
      </div>
    </div>
  );
};
