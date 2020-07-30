import React, { useState, useEffect } from "react";
import { InputGroup, Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import { tagAPI } from "resources/api/tag";
import { TagProps } from "resources/models/TagProps";
import { TagList } from "components/Tag/TagList";

export const TagCreate = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<TagProps[]>([]);
  const loadTags = (search: string) => {
    tagAPI.get(search).then((tags) => setTags(tags ?? []));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    loadTags(value);
    setTag(value);
  };

  const handleSave = () => {
    tagAPI
      .put(tag)
      .then(() => {
        alert("Save");
        setTag("");
        loadTags("");
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    loadTags("");
  }, []);

  return (
    <div>
      <div className="card-header">
        <h2>Thêm tag mới</h2>
      </div>
      <div className="card-content">
        <FormGroup>
          <ControlGroup fill={true} vertical={false}>
            <InputGroup
              placeholder="Tên tag"
              value={tag}
              name="tag"
              onChange={handleChange}
            />
            <Button icon="add" intent="success" onClick={handleSave}></Button>
          </ControlGroup>
        </FormGroup>
        <h2>Danh sách các tag</h2>
        <TagList tags={tags} />
      </div>
    </div>
  );
};
