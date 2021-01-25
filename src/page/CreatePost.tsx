import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CreatePostRequest,
  PostRestriction,
  UpdatePostRequest,
} from "resources/models/post";
import { Alert } from "components/commons/Alert";
import { generateIDParamPath, postRoutes } from "constants/postRoutes";
import { PostContentEditor } from "components/post/PostEditor";
import { Card, CardBody, CardHeader } from "components/layout/Card";
import queryString from "query-string";
import { Button, Icon } from "@chakra-ui/react";
import { MdSave } from "react-icons/md";
import { Layout } from "components/layout/Layout";
import { ProtectedComponent } from "components/commons/ProtectComponent";
import { createPost } from "resources/api/me";
import { useReactOidc } from "@axa-fr/react-oidc-context";
const initialState: CreatePostRequest = {
  content: "\n\n\n\n\n\n",
  title: "",
  subtitle: "",
  coverImageURL: "",
  canComment: false,
  postRestrictionType: PostRestriction.NONE,
  accessUsers: [],
  tags: [],
};

export const CreatePostPage = () => {
  const { oidcUser } = useReactOidc();
  const [request, setRequest] = useState<UpdatePostRequest>(initialState);
  const [tags, setTags] = useState<string[]>([]);
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const [uploadImage, setUploadImage] = useState<File>();
  const history = useHistory();
  const location = useLocation();
  React.useEffect(() => {
    try {
      const query = queryString.parse(location.search);
      if (query == null) return;
      if (query["tags"] == null) {
        setRequest((request) => ({ ...request, tags: [] }));
        return;
      }
      const tags =
        typeof query["tags"] === "string" ? [query["tags"]] : query["tags"];
      setRequest((request) => ({ ...request, tags }));
    } catch {}
  }, [location]);
  const handleSave = () => {
    createPost({ ...request, tags }, oidcUser.access_token)
      .then((u) => {
        if (u == null) return Promise.reject("ERROR");
        history.push(generateIDParamPath(postRoutes.postUpdate, u.id));
      })
      .catch((e) => {
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleAddTag = (tag: string) =>
    setTags((tags) => Array.from(new Set([...tags, tag])));
  const handleRemoveTag = (removedTag: string) =>
    setTags((tags) => tags.filter((tag) => tag !== removedTag));

  return (
    <ProtectedComponent>
      <Layout>
        <Card fluid>
          <CardHeader
            rightElement={
              <Button
                onClick={handleSave}
                colorScheme="blue"
                leftIcon={<Icon as={MdSave} />}
              >
                Lưu bài viết mới
              </Button>
            }
          >
            Soạn bài viết
          </CardHeader>
          <CardBody>
            {alert.isOpen && <Alert>{alert.message}</Alert>}
            <PostContentEditor
              onTagSelect={handleAddTag}
              onTagRemove={handleRemoveTag}
              post={request}
              tags={tags}
              onChange={setRequest}
              uploadedCoverImage={uploadImage}
              onUploadCoverImage={setUploadImage}
            />
          </CardBody>
        </Card>
      </Layout>
    </ProtectedComponent>
  );
};
