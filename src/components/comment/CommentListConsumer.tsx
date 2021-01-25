import React from "react";
import { CommentBox } from "./Comment";
import { Spinner, Button, Center, VStack, Box } from "@chakra-ui/react";
import { CommentListContext } from "./CommentListProvider";
import { CommentModel } from "resources/models/comment";

const Loading = () => (
  <Center>
    <Spinner />
  </Center>
);
const sortComments = (comments: CommentModel[]) => {
  return comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

interface ViewProps {
  comments?: CommentModel[];
  total?: number;
  itemRenderer: (comment: CommentModel) => React.ReactNode;
  onLoadMore?: () => void;
  loading?: boolean;
}
export const CommentListView = ({
  comments,
  itemRenderer,
  total,
  onLoadMore,
  loading,
}: ViewProps) => {
  const sortedComments = React.useMemo(
    () => (comments ? sortComments(comments) : []),
    [comments]
  );
  if (sortedComments == null || total == null) return <Loading />;
  return (
    <Box>
      {!loading &&
        (total == null ||
          (sortedComments.length < total && sortedComments.length > 0)) && (
          <Center>
            <Button variant="ghost" onClick={onLoadMore}>
              Xem thêm bình luận
            </Button>
          </Center>
        )}
      {loading && <Loading />}
      <VStack align="stretch">{sortedComments.map(itemRenderer)}</VStack>
    </Box>
  );
};

export const CommentListConsumer = ({ firstLoad }: { firstLoad?: boolean }) => {
  const {
    comments,
    total,
    loading,
    loadMore,
    updateComment,
  } = React.useContext(CommentListContext);
  React.useEffect(() => {
    if (comments == null && firstLoad) loadMore();
  }, [comments, firstLoad, loadMore]);
  return (
    <CommentListView
      comments={comments}
      total={total}
      loading={loading}
      onLoadMore={loadMore}
      itemRenderer={(comment) => (
        <CommentBox
          updateComment={updateComment}
          comment={comment}
          key={comment.id}
        />
      )}
    />
  );
};
