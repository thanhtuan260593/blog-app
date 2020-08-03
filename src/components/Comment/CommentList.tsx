import React, { useState, useEffect, useCallback } from "react";
import { CommentProps } from "resources/models/CommentProps";
import { Comment } from "./Comment";
import { Spinner, Button } from "@blueprintjs/core";
const pageRows = 10;
const renderCommentList = (comments: CommentProps[]) => {
  return comments.map((comment) => <Comment {...comment} key={comment.id} />);
};

const renderLoading = () => <Spinner size={Spinner.SIZE_SMALL} />;
const union = (a: CommentProps[], b: CommentProps[]) => {
  const newComments = a.filter(
    (u) => (b?.filter((comment) => comment.id === u.id).length ?? 0) === 0
  );
  var unioned = [...(b ?? []), ...newComments];
  return unioned.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const CommentList = ({
  load,
  count,
  initialLoad,
  forceLoad,
}: {
  load: (
    pageIndex: number,
    pageRows: number
  ) => Promise<CommentProps[]> | undefined;
  count: () => Promise<number> | undefined;
  forceLoad?: () => Promise<CommentProps[]>;
  initialLoad?: boolean;
}) => {
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState(false);
  const loadMore = useCallback(() => {
    if (!load || !count) return;
    setLoading(true);
    console.log("Load more");
    const loadAsync = async () => {
      // await new Promise((r) => setTimeout(r, 5000));
      try {
        let index = 0;
        if (comments != null) index = Math.floor(comments.length / pageRows);
        const response = await load(index, pageRows);
        response && setComments(union(response, comments));
        const total = await count();
        total && setTotal(total);
      } finally {
        setLoading(false);
      }
    };
    loadAsync();
  }, [load, comments, count]);

  useEffect(() => {
    count()?.then(setTotal);
  }, [count]);

  useEffect(() => {
    if (!initialLoad) return;
    load(0, 10)?.then(setComments);
  }, [load, count, initialLoad]);

  useEffect(() => {
    if (forceLoad == null) return;
    console.log("Force load");
    setLoading(true);
    forceLoad()
      .then((res) => {
        setComments((comments) => union(comments, res));
      })
      .finally(() => setLoading(false));
  }, [forceLoad]);

  if (loading) return renderLoading();
  return (
    <div className="comments-container">
      {renderCommentList(comments)}
      {loading && renderLoading()}
      {!loading && (total == null || comments.length < total) && (
        <div className="post-meta">
          <Button minimal onClick={loadMore}>
            Xem thêm bình luận
          </Button>
        </div>
      )}
    </div>
  );
};
