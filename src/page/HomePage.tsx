import React from "react";
import { PostByTags } from "components/post/PostByTags";
import { FeaturePublicLayout } from "components/layout/PublicLayout";

export const Home = () => {
  return (
    <FeaturePublicLayout>
      <PostByTags
        includeAllTags
        displayType="stack"
        showTag
        showImage
        tags={[]}
      />
    </FeaturePublicLayout>
  );
};
