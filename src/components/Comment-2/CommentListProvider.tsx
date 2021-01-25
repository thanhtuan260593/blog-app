import React, { useState } from "react";
import { CommentModel } from "resources/models/comment";
import { EditingComment } from "./Comment";

type CommentSet = { [id: number]: CommentModel };
const toCommentSet = (comments: CommentModel[]) => {
  const set: CommentSet = {};
  comments.forEach((comment) => (set[comment.id] = comment));
  return set;
};
const pushNewComments = (
  comments: CommentModel[] | undefined,
  newComments: CommentModel[],
  collapse: boolean = false
) => {
  const set = toCommentSet([
    ...(comments ?? []),
    ...newComments.map((u) => ({ ...u, collapse })),
  ]);
  return Object.values(set);
};
interface ContextProps {
  comments?: CommentModel[];
  total?: number;
  loading?: boolean;
  addComment?: (content: string) => Promise<CommentModel>;
  updateComment?: (comment: CommentModel) => Promise<CommentModel>;
  deleteComment?: (id: number) => Promise<void>;
  loadMore: () => void;
  reload: () => void;
  onSelect: (comment?: EditingComment) => void;
  selectedComment?: EditingComment;
  onCommentChange: (comment: CommentModel) => void;
  clearComments: () => void;
}
export const CommentListContext = React.createContext<ContextProps>({
  loadMore: () => {},
  reload: () => {},
  onSelect: () => {},
  onCommentChange: () => {},
  clearComments: () => {},
  updateComment: async () => ({} as CommentModel),
});

interface ProviderProps {
  loadComments: (index: number, row: number) => Promise<CommentModel[]>;
  countComment: () => Promise<number>;
  addComment?: (content: string) => Promise<CommentModel>;
  updateComment?: (comment: CommentModel) => Promise<CommentModel>;
  deleteComment?: (id: number) => Promise<void>;
  total?: number;
  children: React.ReactNode;
}
const rowLimit = 10;

export const CommentListProvider = (props: ProviderProps) => {
  const [comments, setComments] = useState<CommentModel[]>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>();
  const [selectedComment, setSelectedComment] = useState<EditingComment>();
  const reload = React.useCallback(async () => {
    try {
      setLoading(true);
      const loadedComments = await props.loadComments(0, rowLimit);
      if (comments == null) {
        setComments(loadedComments.map((u) => ({ ...u, collapse: false })));
        return;
      }
      const newComments = loadedComments
        .filter(
          (comment) =>
            comments.filter((current) => current.id === comment.id).length === 0
        )
        .map((u) => ({ ...u, collapse: false }));
      setComments([...newComments, ...comments]);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  }, [props, comments]);
  const loadMore = React.useCallback(async () => {
    try {
      setLoading(true);
      const newComments = await props.loadComments(
        comments?.length ?? 0,
        rowLimit
      );
      const total = await props.countComment();
      setComments(pushNewComments(comments, newComments, false));
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }, [comments, props]);
  const addCommentCallback = React.useCallback(
    async (content: string) => {
      try {
        if (props.addComment == null) throw Error();
        const newComment = await props.addComment(content);
        if (comments != null) {
          setComments(pushNewComments(comments, [newComment]));
          setTotal((total) => (total ? total + 1 : total));
        } else {
          setTimeout(reload);
        }
        setSelectedComment(undefined);
        return newComment;
      } catch (e) {
        throw e;
      }
    },
    [props, comments, reload]
  );
  const addComment = React.useMemo(
    () => (props.addComment ? addCommentCallback : undefined),
    [props, addCommentCallback]
  );
  const updateComment = React.useCallback(
    async (updatedComment: CommentModel) => {
      if (props.updateComment == null) throw new Error();
      try {
        setLoading(true);
        const comment = await props.updateComment(updatedComment);
        if (comments == null) {
          await reload();
        } else {
          const updatedComments = comments.map((current) =>
            current.id === comment.id ? { ...comment, collapse: true } : current
          );
          setComments(updatedComments);
          setSelectedComment(undefined);
        }
        return comment;
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [comments, props, reload]
  );
  const deleteComment = React.useMemo(() => {
    if (props.deleteComment == null) return;
    return async (id: number) => {
      if (props.deleteComment == null) throw new Error();
      try {
        setLoading(true);
        await props.deleteComment(id);
        setComments((comments) =>
          comments ? comments.filter((comment) => comment.id !== id) : comments
        );
        setTotal((total) => (total ? total - 1 : total));
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    };
  }, [props]);
  const onCommentChange = React.useCallback(
    (comment: CommentModel) => {
      if (comments == null) {
        return;
      }
      setComments(
        comments.map((current) =>
          current.id === comment.id ? comment : current
        )
      );
    },
    [comments]
  );
  const clearComments = () => {
    setComments(undefined);
  };
  const onSelect = (comment?: EditingComment) => setSelectedComment(comment);
  React.useEffect(() => {
    if (props.total != null) {
      setTotal(props.total);
      return;
    }
    let subscription = true;
    props.countComment().then((total) => {
      if (subscription) setTotal(total);
    });
    return () => {
      subscription = false;
    };
  }, [props]);

  return (
    <CommentListContext.Provider
      value={{
        comments,
        loading,
        total,
        loadMore,
        reload,
        addComment,
        updateComment,
        deleteComment,
        selectedComment,
        onSelect,
        onCommentChange,
        clearComments,
      }}
    >
      {props.children}
    </CommentListContext.Provider>
  );
};
