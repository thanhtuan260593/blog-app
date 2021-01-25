import { Box, Flex, VStack, Skeleton, Button, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader } from "components/layout/Card";
import { routes } from "constants/routes";
import React from "react";
import { PostCountByAuthor } from "resources/models/post";
import { getCountByAuthors } from "resources/api/post";
const limit = 10;
export const Item = (props: PostCountByAuthor) => (
  <Link to={routes.user.getPath(props.author)}>
    <Flex fontWeight="bold" justify="stretch" w="100%">
      <Box flex={1}>{props.author}</Box>
      <Box>{props.totalPost}</Box>
    </Flex>
  </Link>
);
export const TopBloggersSkeleton = () => {
  const renderItems = () => {
    const components = [];
    for (let i = 0; i < 10; i++) {
      components.push(
        <Skeleton key={i}>
          <Item author="lotus" totalPost={2020}></Item>
        </Skeleton>
      );
    }
    return components;
  };
  return <VStack align="stretch">{renderItems()}</VStack>;
};
export const TopBloggers = () => {
  const [countByAuthor, setCountByAuthor] = React.useState<
    PostCountByAuthor[]
  >();
  const loadMore = React.useCallback(async () => {
    const groups = await getCountByAuthors(limit, countByAuthor?.length ?? 0);
    setCountByAuthor((state) => [...(state ?? []), ...groups]);
  }, [countByAuthor]);
  React.useEffect(() => {
    getCountByAuthors(limit, 0).then(setCountByAuthor);
  }, []);
  if (countByAuthor == null) return <TopBloggersSkeleton />;
  return (
    <Card>
      <CardHeader>Tác giả</CardHeader>
      <CardBody>
        <VStack align="stretch">
          {countByAuthor.map((group, index) => (
            <Item key={index} {...group} />
          ))}
        </VStack>
        <Center mt={4}>
          <Button variant="link" onClick={loadMore}>
            Load more
          </Button>
        </Center>
      </CardBody>
    </Card>
  );
};
