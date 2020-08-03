import React, { useState, useEffect, useCallback } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Button, Spinner, Icon } from "@blueprintjs/core";
import { postAPI } from "resources/api/post";
import {
  UpdatePostRequest,
  PostContentRequest,
  PostSettingRequest,
} from "resources/models/PostAPI";
import { Alert } from "components/Commons/Alert";
import { Layout2 } from "layout/Layout2";
import { routes } from "constants/routes";
import {
  PostSettingEditor,
  PostContentEditor,
} from "components/Post/PostEditor";

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
        viewDetail();
      })
      .catch((e) => {
        setAlert({ isOpen: true, message: e.message });
      });
  };

  const handleContentChange = (content: PostContentRequest) => {
    setRequest((request) => (request ? { ...request, ...content } : request));
  };

  const handleSettingChange = (settings: PostSettingRequest) => {
    setRequest((request) => (request ? { ...request, ...settings } : request));
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

  const viewDetail = useCallback(() => {
    id && history.push(routes.postDetail.getPath(id));
  }, [id, history]);

  if (request == null || tags == null) {
    return <Spinner />;
  }

  return (
    <Layout2>
      <div className="card">
        <Alert isOpen={alert.isOpen} message={alert.message} />
        <div className="card-header align-left">
          <h2>Soạn bài viết</h2>
          <div className="card-header-actions">
            <Button
              minimal
              intent="primary"
              icon="eye-open"
              onClick={viewDetail}
            />
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
        tags={tags}
        settings={request}
        onSettingChange={handleSettingChange}
        onTagSelect={handleSelect}
        onTagRemove={handleRemove}
      />
    </Layout2>
  );
};
