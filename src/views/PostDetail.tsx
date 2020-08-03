import React, { useEffect, useState, useCallback, useMemo } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { PostProps } from "resources/models/PostProps";
import { Callout, NonIdealState } from "@blueprintjs/core";
import { Layout2 } from "layout/Layout2";
import { PostByTags } from "components/Post/PostByTags";
import { PostDetail, LoadingPost } from "components/Post/Post";
import { postAPI } from "resources/api/post";
import { SearchPost } from "components/Comment/SearchPost";
import { RequestError } from "resources/api/helper";
import { routes } from "constants/routes";
type TParams = { id: string };

export const PostNotFound = ({ match }: RouteComponentProps<TParams>) => {
  return (
    <div className="content">
      <div className="container">
        <div className="card">
          <NonIdealState
            icon="document"
            title="Không tìm thấy bài viết"
            description={`Bài viết ${match.params.id} hiện không có trong hệ thống`}
            action={<SearchPost />}
          />
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
};

export const PostDetailView = ({ match }: RouteComponentProps<TParams>) => {
  const [post, setPost] = useState<PostProps>();
  const [error, setError] = useState<string>();
  const history = useHistory();
  const id = useMemo(() => Number(match.params.id), [match.params]);
  const reloadMetric = useCallback(() => {
    postAPI.getPostMetric(id).then((metric) =>
      setPost((post) =>
        post
          ? {
              ...post,
              viewCount: metric.viewCount,
              commentCount: metric.commentCount,
            }
          : undefined
      )
    );
  }, [id]);
  useEffect(() => {
    postAPI
      .getPost(id)
      .then((u) => {
        setPost(u);
      })
      .catch((e: RequestError) => {
        if (e.code === 404) history.push(routes.postNotFound.getPath(id));
        setError(e.message);
      });
  }, [id, history]);
  if (error != null) {
    return <Callout intent="danger">{error}</Callout>;
  }

  return (
    <Layout2>
      <div className="card">
        {post ? (
          <PostDetail post={post} reloadMetric={reloadMetric} />
        ) : (
          <LoadingPost />
        )}
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Các bài viết liên quan</h2>
        </div>
        {post ? (
          <PostByTags
            tags={post.tags ?? []}
            filter={(posts) =>
              posts.filter((filtered) => filtered.id !== post.id)
            }
          />
        ) : (
          <LoadingPost />
        )}
      </div>
    </Layout2>
  );
};
