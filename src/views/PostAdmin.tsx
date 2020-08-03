import React, { useState, useEffect, useCallback } from "react";
import { Layout2 } from "layout/Layout2";
import { TagManage } from "components/Tag/TagManage";
import { TagProps } from "resources/models/TagProps";
import { PostProps } from "resources/models/PostProps";
import { AdminPostList } from "components/Admin/PostList";
import { postAPI } from "resources/api/post";
import { PostsEmpty } from "components/Post/PostsEmpty";

export const Admin = () => {
  const [selectedTag, setSelectedTag] = useState<TagProps>();
  const [posts, setPosts] = useState<PostProps[]>();
  const reload = useCallback(() => {
    const tags = selectedTag ? [selectedTag.value] : [];
    postAPI.getPosts(0, 10, tags).then((posts) => setPosts(posts));
  }, [selectedTag]);
  const handleSelectedTagChange = (tag?: TagProps) => {
    const tags = tag ? [tag.value] : [];
    postAPI
      .getPosts(0, 10, tags)
      .then((posts) => setPosts(posts))
      .finally(() => setSelectedTag(tag));
  };

  useEffect(() => {
    postAPI.getPosts(0, 10, []).then(setPosts);
  }, []);

  return (
    <Layout2>
      <div className="card">
        {posts !== undefined && posts.length === 0 ? (
          <PostsEmpty tags={selectedTag ? [selectedTag] : []} />
        ) : (
          <AdminPostList posts={posts} reload={reload} />
        )}
      </div>
      <div className="card">
        <TagManage onSelectionChange={handleSelectedTagChange} />
      </div>
    </Layout2>
  );
};
