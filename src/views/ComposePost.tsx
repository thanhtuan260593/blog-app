import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RichTextEditor from "components/Editors/Editor";
import { Button, Switch as Sw, InputGroup } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import { Switch } from "react-router-dom";
import { TagSelect } from "components/Tag";
import { CreatePostRequest, PostRestriction } from "resources/models/Post";
import { Alert } from "components/Alert";
import { Layout3_7 } from "layout/Layout3_7";
import { TagCreate } from "components/TagCreate";
import { TagProp } from "components/TagProp";
import { MyQuillEditor } from "components/Editors/MyQuillEditor";

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
export const ComposePost = () => {
  const [request, setRequest] = useState<CreatePostRequest>(initialState);
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  const handleSave = () => {
    postAPI
      .createPost(request)
      .then((u) => {
        history.push(`/update/${u.id}`);
      })
      .catch((e) => {
        console.log("ERROR", e);
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleContentChange = (value: string) => {
    setRequest((r: CreatePostRequest) => ({ ...r, content: value }));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setRequest((r: CreatePostRequest) => ({
      ...r,
      [name]: value,
    }));
  };
  const handleCanCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRequest((r: CreatePostRequest) => ({
      ...r,
      canComment: !r.canComment,
    }));
  };
  const handleTagsChange = (tags: TagProp[]) =>
    setRequest((request) => ({
      ...request,
      tags: tags.map((tag) => tag.value),
    }));

  return (
    <Layout3_7>
      <div>
        <Alert isOpen={alert.isOpen} message={alert.message} />
        <h2>Soạn bài viết</h2>
        <Button intent="primary" onClick={handleSave}>
          Lưu
        </Button>
        <h3>Tiêu đề</h3>
        <InputGroup
          style={{ width: "100%" }}
          large
          placeholder="Tiêu đề"
          value={request.subject}
          name="subject"
          onChange={handleInputChange}
        />
        <h3>Nội dung</h3>

        <MyQuillEditor onChange={handleContentChange} value={request.content} />

        <h3>Thiết lập</h3>
        <Sw checked={request.canComment} onChange={handleCanCommentChange}>
          Có thể bình luận
        </Sw>
        <h3>Tag</h3>
        <TagSelect onChange={handleTagsChange} />
      </div>
      <TagCreate />
    </Layout3_7>
  );
};
