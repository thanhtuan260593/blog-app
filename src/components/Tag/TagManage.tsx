import React, { useState, useEffect } from "react";
import { InputGroup, Button, ControlGroup, FormGroup } from "@blueprintjs/core";
import { tagAPI } from "resources/api/tag";
import { TagProps } from "resources/models/TagProps";
import { TagList, OrderSelect, TagOrderByOption } from "components/Tag/TagList";
import { RequestError } from "resources/api/helper";

interface TagManagerProps {
  onSelectionChange?: (tag?: TagProps) => void;
}
interface TagCreateProps {
  onSuccess?: (tag: TagProps) => {};
  onFailed?: (err: RequestError) => {};
  onCancel?: () => {};
}

export const TagCreate = (props: TagCreateProps) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const handleSave = () => {
    tagAPI
      .put(value)
      .then((tag) => {
        alert("Save");
        setValue("");
        tag && props.onSuccess && props.onSuccess(tag);
      })
      .catch((err: RequestError) => props.onFailed && props.onFailed(err));
  };
  return (
    <FormGroup>
      <ControlGroup fill={true} vertical={false}>
        <InputGroup
          placeholder="Tên tag"
          value={value}
          name="tag"
          onChange={handleChange}
        />
        <Button icon="add" intent="success" onClick={handleSave}></Button>
      </ControlGroup>
    </FormGroup>
  );
};

export const TagManage = (props: TagManagerProps) => {
  const [tags, setTags] = useState<TagProps[]>([]);
  const [filteredTags, setFilteredTags] = useState<TagProps[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleOrderChange = (
    direction: "sort-asc" | "sort-desc",
    orderBy: TagOrderByOption
  ) => {
    console.log(orderBy, direction);
    setTags((origin) => {
      const tags = [...origin];
      const newTags = tags.sort((a: TagProps, b: TagProps) => {
        if (direction === "sort-desc") {
          const c = a;
          a = b;
          b = c;
        }
        if (orderBy.value === "postCount")
          return (a.postCount ?? 0) - (b.postCount ?? 0);
        if (orderBy.value === "lastModifiedPost") {
          const timeA = a.lastModifiedAt
            ? new Date(a.lastModifiedAt)
            : new Date(1900, 1, 1);
          const timeB = b.lastModifiedAt
            ? new Date(b.lastModifiedAt)
            : new Date(1900, 1, 1);
          console.log(timeA, timeB);
          return timeA.getTime() - timeB.getTime();
        }
        return a.value.localeCompare(b.value);
      });
      console.log(newTags);
      return newTags;
    });
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };
  useEffect(() => {
    tagAPI.get("").then((tags) => {
      setTags(tags);
      setFilteredTags(tags);
    });
  }, []);
  useEffect(() => {
    const normalize = search.trim().toLowerCase();
    const filtered = tags.filter(
      (u) =>
        search == null ||
        search === "" ||
        u.value.toLowerCase().match(normalize)
    );
    setFilteredTags(filtered);
  }, [search, tags]);
  return (
    <div>
      <div className="card-content">
        <FormGroup>
          <InputGroup
            placeholder="Lọc theo tên tag"
            fill
            value={search}
            onChange={handleSearchChange}
          />
        </FormGroup>
        <OrderSelect onChange={handleOrderChange} />
        <TagList
          onItemClick={(tag) =>
            props.onSelectionChange && props.onSelectionChange(tag)
          }
          tags={filteredTags}
        />
      </div>
    </div>
  );
};
