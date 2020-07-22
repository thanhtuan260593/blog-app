import React, { useState, useEffect } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import RichTextEditor from "components/Editors/Editor";
import { Button, Switch as Sw, InputGroup, Spinner } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import { Switch } from "react-router-dom";
import {
  CreatePostRequest,
  PostRestriction,
  UpdatePostRequest,
} from "resources/models/Post";
import { Alert } from "components/Alert";
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];
const initialState: UpdatePostRequest = {
  content: JSON.stringify(initialValue),
  subject: "",
  canComment: false,
  postRestrictionType: PostRestriction.NONE,
  accessUsers: [],
};
type TParams = { id: string };
export const UpdatePost = ({ match }: RouteComponentProps<TParams>) => {
  const [request, setRequest] = useState<UpdatePostRequest>();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  useEffect(() => {
    const id = Number(match.params.id);
    postAPI.getPost(id).then((u) => {
      const request: UpdatePostRequest = {
        content: u.content,
        subject: u.subject,
        canComment: u.canComment,
        postRestrictionType: u.postRestrictionType,
        accessUsers: u.postAccessUsers,
      };
      setRequest(request);
    });
  }, []);
  const handleSave = () => {
    if (request == null) return;
    const id = Number(match.params.id);
    postAPI
      .updatePost(id, request)
      .then((u) => {
        history.push(`/update/${id}`);
      })
      .catch((e) => {
        console.log("ERROR", e);
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleContentChange = (value: string) => {
    setRequest((r: UpdatePostRequest | undefined) => {
      if (r == null) return r;
      return { ...r, content: value };
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setRequest((r: UpdatePostRequest | undefined) => {
      if (r == null) return r;
      return { ...r, [name]: value };
    });
  };
  const handleCanCommentChange = () => {
    setRequest((r: UpdatePostRequest | undefined) => {
      if (r == null) return r;
      return {
        ...r,
        canComment: !r.canComment,
      };
    });
  };

  if (request == null) {
    return <Spinner />;
  }

  return (
    <div>
      <Alert isOpen={alert.isOpen} message={alert.message} />
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <h2 style={{ marginBottom: "0" }}>Soạn bài viết</h2>
        </div>
        <div>
          <Button intent="primary" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </div>
      <hr />
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
      <RichTextEditor
        initialValue={request.content}
        onChange={handleContentChange}
      />
      <h3>Thiết lập</h3>
      <Sw checked={request.canComment} onChange={handleCanCommentChange}>
        Có thể bình luận
      </Sw>
    </div>
  );
};
