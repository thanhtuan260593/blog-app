import React, { useEffect, useState, useCallback, useMemo } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { PostProps } from "resources/models/post";
import { PostByTags } from "components/post/PostByTags";
import { PostDetail, LoadingPost } from "components/post/PostDetail";
import { RequestError } from "resources/api/helper";
import { postRoutes } from "constants/postRoutes";
import { CardBody } from "components/layout/Card";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import { PublicLayout } from "components/layout/PublicLayout";
import { getPost, getPostMetric, increaseView } from "resources/api/post";
import { PostListSkeleton } from "components/post/PostList";
interface TParams {
  id: string;
}
export const PostNotFound = () => {
  return (
    <Center h={300}>
      <VStack>
        <Icon as={MdSearch} />
        Không tìm thấy bài viết
      </VStack>
    </Center>
  );
};

const PostSuggestion = ({ post }: { post?: PostProps }) => {
  return (
    <>
      <CardBody>
        {post ? (
          <PostByTags
            tags={post.tags ?? []}
            displayType="list"
            filter={(posts) =>
              posts.filter((filtered) => post && filtered.id !== post.id)
            }
          />
        ) : (
          <PostListSkeleton />
        )}
      </CardBody>
    </>
  );
};

const Page = ({ match }: RouteComponentProps<TParams>) => {
  const [post, setPost] = useState<PostProps>();
  const [error, setError] = useState<string>();
  const history = useHistory();
  const id = useMemo(() => Number(match.params.id), [match.params]);
  const reloadMetric = useCallback(() => {
    getPostMetric(id).then((metric) =>
      setPost((post) =>
        post
          ? {
              ...post,
              viewCount: metric.viewCount,
              commentCount: metric.commentCount,
            }
          : undefined
      )
    );
  }, [id]);
  useEffect(() => {
    getPost(id)
      .then((u) => {
        setPost(u);
      })
      .catch((e: RequestError) => {
        if (e.code === 404) history.push(postRoutes.postNotFound.path);
        setError(e.message);
      });
    increaseView(id);
  }, [id, history]);
  if (error != null) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Đã có lỗi xãy ra</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <PublicLayout subElement={<PostSuggestion post={post} />}>
      {post ? (
        <PostDetail post={post} reloadMetric={reloadMetric} />
      ) : (
        <LoadingPost />
      )}
    </PublicLayout>
  );
};

export const PostDetailView = Page;
