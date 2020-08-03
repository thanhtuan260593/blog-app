import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Icon } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import {
  CreatePostRequest,
  PostRestriction,
  PostContentRequest,
  PostSettingRequest,
} from "resources/models/PostAPI";
import { Alert } from "components/Commons/Alert";
import { Layout2 } from "layout/Layout2";
import { routes } from "constants/routes";
import {
  PostContentEditor,
  PostSettingEditor,
} from "components/Post/PostEditor";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const initialState: CreatePostRequest = {
  content: JSON.stringify(initialValue),
  subject: "",
  canComment: false,
  postRestrictionType: PostRestriction.NONE,
  accessUsers: [],
  tags: [],
};

export const CreatePostView = () => {
  const [request, setRequest] = useState<CreatePostRequest>(initialState);
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  const handleSave = () => {
    postAPI
      .createPost(request)
      .then((u) => {
        if (u == null) return Promise.reject("ERROR");
        history.push(routes.postUpdate.getPath(u.id));
      })
      .catch((e) => {
        console.log("ERROR", e);
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleContentChange = (content: PostContentRequest) => {
    setRequest((r) => ({ ...r, ...content }));
  };
  const handleSettingChange = (event: PostSettingRequest) => {
    setRequest((r: CreatePostRequest) => ({
      ...r,
      canComment: !r.canComment,
    }));
  };
  const handleTagsChange = (tags: string[]) =>
    setRequest((request) => ({
      ...request,
      tags,
    }));

  return (
    <div>
      <Layout2>
        <div className="card">
          <Alert isOpen={alert.isOpen} message={alert.message} />
          <div className="card-header align-left">
            <h2>Soạn bài viết</h2>
            <div className="card-header-actions">
              <Button
                minimal
                intent="primary"
                icon={<Icon icon="floppy-disk" />}
                onClick={handleSave}
              >
                Lưu
              </Button>
            </div>
          </div>
          <div className="card-content">
            <PostContentEditor
              content={request.content}
              subject={request.subject}
              onChange={handleContentChange}
            />
          </div>
        </div>
        <PostSettingEditor
          tags={request.tags}
          settings={request}
          onSettingChange={handleSettingChange}
          onTagsChange={handleTagsChange}
        />
      </Layout2>
    </div>
  );
};
