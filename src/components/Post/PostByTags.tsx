import React, { useState, useEffect, useCallback } from "react";
import { PostProps } from "resources/models/PostProps";
import { PostList } from "components/Post/PostList";
import { Spinner, Button, Classes } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";

interface PostByTagsProp {
  tags?: string[];
  showImage?: boolean;
  showTag?: boolean;
}

const pageRows = 10;

export const PostByTagsLoading = () => {
  return (
    <div
      className={Classes.SKELETON}
      style={{ margin: "20px", height: "400px" }}
    ></div>
  );
};

export const PostByTags = (props: PostByTagsProp) => {
  const [posts, setPosts] = useState<PostProps[]>();
  const [total, setTotal] = useState<number>();
  // const [pageIndex, setPageIndex] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  const loadMore = useCallback(() => {
    setLoading(true);
    let index = 0;
    if (posts != null) index = Math.floor(posts.length / pageRows);
    const loadAsync = async () => {
      try {
        if (props.tags === undefined) return;
        var newPosts = await postAPI.getPosts(index, pageRows, props.tags);
        if (newPosts.length === 0) {
          return;
        }
        const oldPosts =
          posts?.filter(
            (post) =>
              newPosts.filter((newPost) => newPost.id === post.id).length === 0
          ) ?? [];
        setPosts([...oldPosts, ...newPosts]);
        const total = await postAPI.getCount(props.tags);
        setTotal(total);
      } finally {
        setLoading(false);
      }
    };
    loadAsync();
  }, [props.tags, posts]);
  useEffect(() => {
    if (props.tags === undefined) return;
    postAPI.getPosts(0, pageRows, props.tags).then(setPosts);
    postAPI.getCount(props.tags).then(setTotal);
  }, [props.tags]);
  if (posts === undefined || total === undefined) {
    return <PostByTagsLoading />;
  }
  return (
    <div>
      <PostList
        showImage={props.showImage}
        showTag={props.showTag}
        posts={posts}
      />

      {posts.length < total && (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <Button minimal onClick={loadMore}>
              Xem thêm
            </Button>
          )}
        </>
      )}
    </div>
  );
};
