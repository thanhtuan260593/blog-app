import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PostByTags } from "components/post/PostByTags";

import { FeaturePublicLayout } from "components/layout/PublicLayout";
interface TParam {
  tag: string;
}
export const PostTagView = ({ match }: RouteComponentProps<TParam>) => {
  const tag = useMemo(() => {
    return match.params.tag;
  }, [match]);

  return (
    <FeaturePublicLayout>
      <PostByTags includeAllTags displayType="stack" tags={[tag]} />
    </FeaturePublicLayout>
  );
};
