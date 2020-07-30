import React, { useState, useEffect } from "react";
import { useHistory, RouteComponentProps, Link } from "react-router-dom";
import RichTextEditor from "components/Editors/Editor";
import {
  Button,
  Switch as Sw,
  InputGroup,
  Spinner,
  Icon,
  FormGroup,
  Label,
} from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import { UpdatePostRequest } from "resources/models/PostAPI";
import { Alert } from "components/Commons/Alert";
import { Layout2 } from "layout/Layout2";
import { TagSelect } from "components//Tag/TagSelect";
import { TagCreate } from "components/Tag/TagCreate";
import { routes } from "constants/routes";

type TParams = { id: string };
export const UpdatePost = ({ match }: RouteComponentProps<TParams>) => {
  const [request, setRequest] = useState<UpdatePostRequest>();
  const [tags, setTags] = useState<string[]>();
  const [id, setId] = useState<number>();
  const [alert, setAlert] = useState({ isOpen: false, message: "" });
  const history = useHistory();
  useEffect(() => {
    const id = Number(match.params.id);
    postAPI
      .getPost(id)
      .then((u) => {
        const request: UpdatePostRequest = {
          content: u.content,
          subject: u.subject,
          canComment: u.canComment,
          postRestrictionType: u.postRestrictionType,
          accessUsers: u.postAccessUsers,
        };
        setRequest(request);
        setTags(u.tags ?? []);
        setId(id);
      })
      .catch((err) => setAlert({ isOpen: true, message: err.message }));
  }, [match.params.id]);
  const handleSave = () => {
    if (request == null || id == null) return;
    postAPI
      .updatePost(id, request)
      .then(() => {
        history.push(routes.postUpdate.getPath(id));
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

  const handleSelect = (tag: string) => {
    if (id == null) return;
    postAPI.attachTag(id, tag).then(() => {
      setTags((tags) => [...(tags ?? []), tag]);
    });
  };

  const handleRemove = (tag: string) => {
    if (id == null) return;
    postAPI.detachTag(id, tag).then(() => {
      setTags((tags) =>
        tags?.reduce((pre, cur) => {
          if (cur === tag) return pre;
          return [...pre, cur];
        }, [] as string[])
      );
    });
  };

  if (request == null) {
    return <Spinner />;
  }

  return (
    <Layout2>
      <div>
        <Alert isOpen={alert.isOpen} message={alert.message} />
        <div className="card-header align-left">
          <h2>Cập nhật bài viết #{id}</h2>
          <Link to={`/post/${id}`}>
            <Button minimal intent="primary" icon="undo" />
          </Link>
          <Button
            minimal
            intent="primary"
            icon={<Icon icon="floppy-disk" />}
            onClick={handleSave}
          />
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
              initialValue={request.content}
              onChange={handleContentChange}
            />
          </FormGroup>
          <Sw checked={request.canComment} onChange={handleCanCommentChange}>
            Có thể bình luận
          </Sw>
          <Label>Tags</Label>
          {tags && (
            <TagSelect
              value={tags}
              onSelect={handleSelect}
              onRemove={handleRemove}
            />
          )}
        </div>
      </div>
      <TagCreate />
    </Layout2>
  );
};
