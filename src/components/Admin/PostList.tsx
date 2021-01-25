import React from "react";
import { PostItem } from "./PostItem";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { PostListSkeleton } from "components/post/PostList";
import { OrderBySelect } from "components/commons/filters/OrderBySelect";
import { OrderDirSelect } from "components/commons/filters/OrderDirSelect";
import { PostsContext, PostsProvider } from "components/post/PostProvider";
import { TagSelect } from "components/tag/TagSelect";
import { deletePost, getCount, getPosts } from "resources/api/post";
import { useReactOidc } from "@axa-fr/react-oidc-context";

const ListConsumer = () => {
  const { posts, loading, total, loadMore, removePost } = React.useContext(
    PostsContext
  );
  const { oidcUser } = useReactOidc();
  const handleDeletePost = (id: number) => {
    deletePost(id, oidcUser.access_token).then(
      () => removePost && removePost(id)
    );
  };
  if (total == null || posts == null) return <PostListSkeleton />;
  return (
    <VStack align="stretch">
      {posts?.map((post, index) => (
        <Box key={index}>
          <PostItem post={post} onDeleted={() => handleDeletePost(post.id)} />
        </Box>
      ))}
      <Center>
        {!loading && posts.length < total && (
          <Button variant="link" onClick={loadMore}>
            Xem thêm
          </Button>
        )}
        {loading && <Spinner />}
      </Center>
    </VStack>
  );
};

export const AdminPostList = () => {
  const [orderBy, setOrderBy] = React.useState<string>("CreatedBy");
  const [orderDir, setOrderDir] = React.useState<0 | 1>(0);
  const [selectedTags, setSelectedTags] = React.useState<string[]>();
  const query = React.useCallback(
    (offset: number, limit: number) =>
      getPosts(offset, limit, selectedTags ?? [], orderBy, orderDir),
    [orderBy, orderDir, selectedTags]
  );
  const count = React.useCallback(() => getCount(selectedTags ?? []), [
    selectedTags,
  ]);
  return (
    <VStack align="stretch">
      <Flex align="center">
        <Box flex={1} pr={4}>
          <TagSelect
            value={selectedTags}
            onTagRemove={(tag) =>
              setSelectedTags((tags) =>
                tags ? tags.filter((selected) => selected !== tag) : tags
              )
            }
            onTagSelect={(tag) =>
              setSelectedTags((tags) => {
                const set = new Set(tags);
                set.add(tag);
                return Array.from(set);
              })
            }
          />
        </Box>
        <HStack>
          <OrderBySelect value={orderBy} onChange={setOrderBy} />
          <OrderDirSelect value={orderDir} onChange={setOrderDir} />
        </HStack>
      </Flex>
      <PostsProvider query={query} count={count} initLoad>
        <ListConsumer />
      </PostsProvider>
    </VStack>
  );
};
