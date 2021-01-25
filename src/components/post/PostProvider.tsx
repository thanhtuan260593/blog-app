import React from "react";
import { PostProps } from "resources/models/post";

export const PostsContext = React.createContext<{
  loadMore: () => void;
  removePost?: (id: number) => void;
  addPost?: (post: PostProps) => void;
  posts?: PostProps[];
  total?: number;
  loading: boolean;
}>({
  loadMore: () => {},
  posts: [],
  loading: false,
});
interface Props {
  query: (offset: number, limit: number) => Promise<PostProps[]>;
  count: () => Promise<number>;
  filter?: (posts: PostProps[]) => PostProps[];
  initLoad?: boolean;
  children: React.ReactNode;
}
export const PostsProvider = ({
  query,
  count,
  initLoad,
  children,
  filter,
}: Props) => {
  const [total, setTotal] = React.useState<number>();
  const [allPosts, setPosts] = React.useState<PostProps[]>();
  const posts = React.useMemo(() => {
    if (filter == null || allPosts == null) return allPosts;
    return filter(allPosts);
  }, [allPosts, filter]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const loadMore = React.useCallback(async () => {
    const postCount = posts?.length ?? 0;
    try {
      setLoading(true);
      const newPosts = await query(postCount, 10);
      const total = await count();
      setPosts((posts) => [
        ...(posts?.filter(
          (post) =>
            newPosts.filter((newPost) => newPost.id === post.id).length === 0
        ) ?? []),
        ...newPosts,
      ]);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }, [posts, count, query]);
  const addPost = (post: PostProps) => {
    setPosts((posts) => [...(posts ?? []), post]);
  };
  const removePost = (id: number) => {
    setPosts((posts) => posts?.filter((post) => post.id !== id));
  };
  React.useEffect(() => {
    let subscription = true;
    const load = async () => {
      try {
        setPosts([]);
        setLoading(true);
        if (initLoad) {
          const posts = await query(0, 10);
          if (subscription) setPosts(posts);
        }
        const total = await count();
        if (subscription) setTotal(total);
      } finally {
        if (subscription) setLoading(false);
      }
    };
    load();
    return () => {
      subscription = false;
    };
  }, [count, query, initLoad]);
  return (
    <PostsContext.Provider
      value={{ posts, total, loadMore, addPost, removePost, loading }}
    >
      {children}
    </PostsContext.Provider>
  );
};
