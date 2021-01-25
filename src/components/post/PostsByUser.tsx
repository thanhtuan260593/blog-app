import React from "react";
import { PublicLayout } from "components/layout/PublicLayout";
import { PostsContext, PostsProvider } from "components/post/PostProvider";
import { PostStackConsumer } from "components/post/PostStack";
import { Avatar, Box, Center, Text, VStack } from "@chakra-ui/react";
import { TopBloggers } from "components/post/TopBloggers";
import { Card, CardBody, CardHeader } from "components/layout/Card";
import { Tags } from "components/tag/Tags";
import { getCount, getPosts } from "resources/api/post";

const LeftPanel = () => {
  const { posts } = React.useContext(PostsContext);
  const tags = React.useMemo(() => {
    const set = new Set<string>();
    if (posts == null) return [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (post.tags == null) continue;
      for (let j = 0; j < post.tags.length; j++) {
        set.add(post.tags[j]);
      }
    }
    return Array.from(set);
  }, [posts]);

  return (
    <VStack align="stretch" spacing={6}>
      <TopBloggers />
      <Card>
        <CardHeader>Tags</CardHeader>
        <CardBody>
          <Tags tagIds={tags} />
        </CardBody>
      </Card>
    </VStack>
  );
};

export const PostsByUser = ({ user }: { user: string }) => {
  const filter = React.useMemo(
    () => ({
      createdBy: user,
    }),
    [user]
  );
  const postQuery = React.useCallback(
    (offset: number, limit: number) => {
      return getPosts(offset, limit, [], undefined, undefined, filter);
    },
    [filter]
  );
  const countPostQuery = React.useCallback(() => getCount([], filter), [
    filter,
  ]);
  return (
    <PostsProvider query={postQuery} count={countPostQuery} initLoad>
      <Box>
        <Box position="relative" h={32} w="100%">
          <Box position="absolute" bottom={8} left={0} right={0}>
            <Center>
              <Avatar size="lg" name={user} />
            </Center>
            <Center>
              <Text fontWeight="bold" fontSize="xl">
                {user}
              </Text>
            </Center>
          </Box>
        </Box>
        <PublicLayout subElement={<LeftPanel />}>
          <PostStackConsumer showTag />
        </PublicLayout>
      </Box>
    </PostsProvider>
  );
};
