import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Spinner, Icon, HStack, Button } from "@chakra-ui/react";
import { PostProps, UpdatePostRequest } from "resources/models/post";
import { Alert } from "components/commons/Alert";
import { generateIDParamPath, postRoutes } from "constants/postRoutes";
import { PostContentEditor } from "components/post/PostEditor";
import { MdArrowBack, MdDelete, MdSave } from "react-icons/md";
import { Card, CardBody, CardHeader } from "components/layout/Card";
import { Layout } from "components/layout/Layout";
import { ConfirmAlert } from "components/commons/Confirm";
import { ProtectedComponent } from "components/commons/ProtectComponent";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { LoadingModal } from "components/commons/LoadingModal";
import { upload } from "resources/api/image";
import { attachTag, deletePost, detachTag, updatePost } from "resources/api/me";
import { getPost } from "resources/api/post";
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
type TParams = { id: string };
export const UpdatePost = ({ post }: { post?: PostProps }) => {
  const [request, setRequest] = useState<UpdatePostRequest>();
  const [owner, setOwner] = useState<string>();
  const [tags, setTags] = useState<string[]>();
  const [id, setId] = useState<number>();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const [uploadImage, setUploadImage] = React.useState<File>();
  const [loadingMessage, setLoadingMessage] = React.useState<string>();
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const { oidcUser } = useReactOidc();
  const history = useHistory();
  useEffect(() => {
    if (post == null) return;
    const request: UpdatePostRequest = {
      content: post.content,
      subtitle: post.subtitle,
      coverImageURL: post.coverImageURL,
      title: post.title,
      canComment: post.canComment,
      postRestrictionType: post.postRestrictionType,
      accessUsers: post.postAccessUsers,
    };
    setRequest(request);
    setOwner(post.createdBy);
    setTags(post.tags ?? []);
    setId(post.id);
  }, [post]);
  const handleSave = async () => {
    if (request == null || id == null) return;
    try {
      let coverImageURL = request.coverImageURL;
      if (uploadImage != null) {
        setLoadingMessage(`Đang upload hình ảnh...`);
        const filePath = `users/${oidcUser.profile.sub}/${uuidv4()}_${
          uploadImage.name
        }`;
        const img = await upload(filePath, uploadImage, oidcUser.access_token);
        coverImageURL = `${process.env.REACT_APP_IMAGE_API_URL}/images/webp/300/0/${img.fullname}`;
      }
      setLoadingMessage("Đang cập nhật bài viết");
      await updatePost(
        id,
        { ...request, coverImageURL },
        oidcUser.access_token
      );
      viewDetail();
    } catch (e) {
      setAlert({ isOpen: true, message: e.message });
    } finally {
      setLoadingMessage(undefined);
    }
  };

  const handleSelect = (tag: string) => {
    if (id == null) return;
    attachTag(id, tag, oidcUser.access_token).then(() => {
      setTags((tags) => [...(tags ?? []), tag]);
    });
  };

  const handleRemove = (tag: string) => {
    if (id == null) return;
    detachTag(id, tag, oidcUser.access_token).then(() => {
      setTags((tags) =>
        tags?.reduce((pre, cur) => {
          if (cur === tag) return pre;
          return [...pre, cur];
        }, [] as string[])
      );
    });
  };

  const viewDetail = useCallback(() => {
    id && history.push(generateIDParamPath(postRoutes.postDetail, id));
  }, [id, history]);

  const handleDelete = useCallback(async () => {
    if (id == null) return;
    try {
      setLoadingMessage("Đang xóa bài viết ...");
      await deletePost(id, oidcUser.access_token);
    } catch (e) {
      setAlert(e);
    } finally {
      setLoadingMessage(undefined);
    }
  }, [id, oidcUser]);
  if (owner == null || request == null || tags == null) {
    return <Spinner />;
  }
  return (
    <Layout px={8}>
      {alert.message && <Alert>{alert.message}</Alert>}
      <LoadingModal
        message={loadingMessage}
        isOpen={loadingMessage != null}
        onClose={() => setLoadingMessage(undefined)}
      />
      <Card>
        <CardHeader
          rightElement={
            <HStack>
              <Button
                colorScheme="blue"
                aria-label="view"
                leftIcon={<Icon as={MdArrowBack} />}
                onClick={viewDetail}
              >
                Trở về
              </Button>
              <ConfirmAlert
                isOpen={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                title="Xác nhận xóa bài viết"
                onConfirm={handleDelete}
                colorScheme="red"
              />
              <Button
                onClick={() => setConfirmDelete(true)}
                colorScheme="red"
                aria-label="delete"
                leftIcon={<Icon as={MdDelete} />}
              >
                Xóa
              </Button>
              <Button
                colorScheme="blue"
                aria-label="save"
                leftIcon={<Icon as={MdSave} />}
                onClick={handleSave}
              >
                Lưu cập nhật
              </Button>
            </HStack>
          }
        >
          Cập nhật bài viết {id}
        </CardHeader>

        <CardBody>
          <PostContentEditor
            post={request}
            tags={tags}
            onTagSelect={handleSelect}
            onTagRemove={handleRemove}
            onChange={setRequest}
            uploadedCoverImage={uploadImage}
            onUploadCoverImage={setUploadImage}
          />
        </CardBody>
      </Card>
    </Layout>
  );
};
export const UpdatePostUser = ({ match }: RouteComponentProps<TParams>) => {
  const [post, setPost] = React.useState<PostProps>();
  useEffect(() => {
    const id = Number(match.params.id);
    getPost(id).then(setPost);
  }, [match.params.id]);
  return (
    <ProtectedComponent owner={post?.createdBy}>
      <UpdatePost post={post} />
    </ProtectedComponent>
  );
};
