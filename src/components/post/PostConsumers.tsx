import { Button, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { PostsContext } from "./PostProvider";
export const LoadingConsumer = () => {
  const { loading } = React.useContext(PostsContext);
  if (loading)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return <></>;
};
export const LoadMoreConsumer = () => {
  const { posts, total, loadMore, loading } = React.useContext(PostsContext);
  if (posts != null && total != null && posts.length < total)
    return (
      <Center pt={4}>
        {loading ? (
          <Spinner />
        ) : (
          <Button variant="link" onClick={loadMore}>
            Xem thêm
          </Button>
        )}
      </Center>
    );
  return <></>;
};
