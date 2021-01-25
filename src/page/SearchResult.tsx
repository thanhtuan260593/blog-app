import React, { useMemo } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { PostProps } from "resources/models/post";
import {
  PostOverview,
  PostOverviewSkeleton,
} from "components/post/PostOverview";
import { PublicLayout } from "components/layout/PublicLayout";
import { Card, CardBody, CardHeader } from "components/layout/Card";
import { RemoteList } from "components/commons/RemoteList";
import { countSearchedPosts, searchPosts } from "resources/api/post";
const queryString = require("query-string");
interface SearchQuery {
  tags: string[];
  keywords: string[];
}

export const SearchResultView = (props: RouteComponentProps) => {
  const history = useHistory();
  const query: SearchQuery = useMemo(() => {
    const searchValue = queryString.parse(props.location.search)
      .search as string;
    if (searchValue == null || searchValue.length === 0) {
      history.push("/");
      return { keywords: [], tags: [] };
    }
    const words = searchValue.split(" ");
    const { keywords, tags } = words.reduce(
      ({ tags, keywords }: { tags: string[]; keywords: string[] }, current) => {
        const directiveParts = current.split(":");
        if (
          directiveParts.length === 2 &&
          directiveParts[0].toLowerCase() === "t"
        ) {
          return { tags: [...tags, directiveParts[1]], keywords };
        }
        if (directiveParts.length > 0) {
          return { tags, keywords: [...keywords, current] };
        }
        return { tags, keywords };
      },
      { tags: [], keywords: [] }
    );
    return { keywords, tags };
  }, [props.location, history]);
  const postQuery = React.useCallback(
    (offset: number, limit: number) =>
      searchPosts(offset, limit, query.tags, query.keywords),
    [query]
  );
  const count = React.useCallback(
    () => countSearchedPosts(query.tags, query.keywords),
    [query]
  );

  return (
    <PublicLayout subElement={<></>}>
      <Card fluid>
        <CardHeader>Bài viết liên quan</CardHeader>
        <CardBody>
          <RemoteList
            itemRenderer={(item: PostProps) => <PostOverview post={item} />}
            query={postQuery}
            count={count}
            loadingItem={<PostOverviewSkeleton />}
          />
        </CardBody>
      </Card>
    </PublicLayout>
  );
};
