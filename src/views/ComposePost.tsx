import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import RichTextEditor from "components/Editors/Editor";
import {
  Button,
  Switch as Sw,
  InputGroup,
  Icon,
  FormGroup,
  Label,
} from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import { TagSelect } from "components/Tag/TagSelect";
import { CreatePostRequest, PostRestriction } from "resources/models/PostAPI";
import { Alert } from "components/Commons/Alert";
import { Layout2 } from "layout/Layout2";
import { TagCreate } from "components/Tag/TagCreate";
import { TagProps } from "resources/models/TagProps";

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
        if (u == null) return Promise.reject("ERROR");
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
  const handleTagsChange = (tags: TagProps[]) =>
    setRequest((request) => ({
      ...request,
      tags: tags.map((tag) => tag.value),
    }));

  return (
    <Layout2>
      <div>
        <Alert isOpen={alert.isOpen} message={alert.message} />
        <div className="card-header align-left">
          <h2>Soạn bài viết</h2>
          <div className="card-header-actions">
            <Button
              minimal
              icon={<Icon icon="floppy-disk" />}
              onClick={handleSave}
            >
              Lưu
            </Button>
          </div>
        </div>
        <div className="card-content">
          <FormGroup label="Tiêu đề">
            <InputGroup
              style={{ width: "100%" }}
              large
              placeholder="Tiêu đề"
              value={request.subject}
              name="subject"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup label="Nội dung">
            <RichTextEditor
              onChange={handleContentChange}
              initialValue={JSON.stringify(initialValue)}
            />
          </FormGroup>
          <Sw checked={request.canComment} onChange={handleCanCommentChange}>
            Có thể bình luận
          </Sw>
          <Label>Tag</Label>
          <TagSelect onChange={handleTagsChange} />
        </div>
      </div>
      <TagCreate />
    </Layout2>
  );
};
