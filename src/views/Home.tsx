import React from "react";
import { PostByTags } from "components/Post/PostByTags";
import { Layout3 } from "layout/Layout3";

export const Home = () => {
  return (
    <Layout3>
      <div className="card">
        <div className="card-header">
          <h2>BÀI VIẾT</h2>
        </div>
        <PostByTags showTag showImage tags={[]} />
      </div>
    </Layout3>
  );
};
