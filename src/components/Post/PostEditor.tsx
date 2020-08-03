import React, { useState, useCallback } from "react";
import { Switch as Sw, Label, FormGroup, InputGroup } from "@blueprintjs/core";
import { TagSelect } from "components/Tag/TagSelect";
import {
  PostSettingRequest,
  PostContentRequest,
} from "resources/models/PostAPI";
import { TagProps } from "resources/models/TagProps";
import RichTextEditor from "components/Editors/Editor";

export interface PostSettingEditorProps {
  onSettingChange: (request: PostSettingRequest) => void;
  onTagsChange?: (tags: string[]) => void;
  onTagSelect?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  tags: string[];
  settings: PostSettingRequest;
}

export const PostSettingEditor = (props: PostSettingEditorProps) => {
  const [settings, setSettings] = useState<PostSettingRequest>(props.settings);

  const handleCanCommentChange = useCallback(() => {
    const newSettings = {
      ...settings,
      canComment: !settings.canComment,
    };
    setSettings(newSettings);
    props.onSettingChange(newSettings);
  }, [props, settings]);

  const handleTagsChange = useCallback(
    (tags: TagProps[]) => {
      const tagStrs = tags.map((tag) => tag.value);
      props.onTagsChange && props.onTagsChange(tagStrs);
    },
    [props]
  );

  return (
    <div className="card">
      <div className="card-header align-left">
        <h2>Thiết lập</h2>
      </div>
      <div className="card-content">
        <Sw checked={settings.canComment} onChange={handleCanCommentChange}>
          Có thể bình luận
        </Sw>
        <Label>Tags</Label>
        <TagSelect
          fill
          value={props.tags}
          onChange={handleTagsChange}
          onSelect={(tag) => props.onTagSelect && props.onTagSelect(tag)}
          onRemove={(tag) => props.onTagRemove && props.onTagRemove(tag)}
        />
      </div>
    </div>
  );
};

interface PostContentEditorProps {
  content: string;
  subject: string;
  onChange: (p: PostContentRequest) => void;
}

export const PostContentEditor = (props: PostContentEditorProps) => {
  const [content, setContent] = useState(props.content);
  const [subject, setSubject] = useState(props.subject);
  const handleContentChange = (content: string) => {
    setContent(content);
    props.onChange({ content, subject });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subject = event.target.value;
    setSubject(subject);
    props.onChange({ content, subject });
  };
  return (
    <div className="card-content">
      <FormGroup label="Tiêu đề">
        <InputGroup
          style={{ width: "100%" }}
          large
          placeholder="Tiêu đề"
          value={subject}
          name="subject"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup label="Nội dung">
        <RichTextEditor onChange={handleContentChange} initialValue={content} />
      </FormGroup>
    </div>
  );
};
