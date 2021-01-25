import { ProtectedComponent } from "components/commons/ProtectComponent";
import { UpdatePost } from "page/UpdatePost";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { getPost } from "resources/api/post";
import { PostProps } from "resources/models/post";
interface TParams {
  id: string;
}
export const UpdatePostAdmin = ({ match }: RouteComponentProps<TParams>) => {
  const [post, setPost] = React.useState<PostProps>();
  React.useEffect(() => {
    const id = Number(match.params.id);
    getPost(id).then(setPost);
  }, [match.params.id]);
  return (
    <ProtectedComponent>
      <UpdatePost post={post} />
    </ProtectedComponent>
  );
};
