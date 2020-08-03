import React, { useState, useCallback } from "react";
import {
  Tag,
  HTMLSelect,
  Button,
  IOptionProps,
  HTMLTable,
  ControlGroup,
  FormGroup,
} from "@blueprintjs/core";
import { TagProps } from "resources/models/TagProps";

interface TagListProps {
  tags: TagProps[];
  onItemClick?: (tag?: TagProps) => void;
}

interface OrderSelectProps {
  onChange: (
    direction: "sort-asc" | "sort-desc",
    orderBy: TagOrderByOption
  ) => void;
}

export type TagOrderByEnum = "value" | "postCount" | "lastModifiedPost";
export interface TagOrderByOption extends IOptionProps {
  value: TagOrderByEnum;
}
const orderOptions: TagOrderByOption[] = [
  {
    label: "Tên tag",
    value: "value",
  },
  { label: "Số bài viết", value: "postCount" },
  { label: "Thời gian cập nhật", value: "lastModifiedPost" },
];

export const OrderSelect = ({ onChange }: OrderSelectProps) => {
  const [direction, setDirection] = useState<"sort-asc" | "sort-desc">(
    "sort-asc"
  );
  const [orderBy, setOrderBy] = useState<TagOrderByOption>(orderOptions[0]);

  const onDirectionChange = useCallback(() => {
    const newDirection = direction === "sort-asc" ? "sort-desc" : "sort-asc";
    setDirection(newDirection);
    onChange(newDirection, orderBy);
  }, [direction, orderBy, onChange]);

  const onOrderByChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      var filter = orderOptions.filter((o) => o.value === event.target.value);
      if (filter.length === 1) {
        setOrderBy(filter[0]);
        onChange(direction, filter[0]);
      }
    },
    [direction, onChange]
  );

  return (
    <FormGroup>
      <ControlGroup fill>
        <HTMLSelect
          value={orderBy.value}
          options={orderOptions}
          onChange={onOrderByChange}
        ></HTMLSelect>
        <Button
          style={{ flex: "0 0 auto" }}
          icon={direction}
          onClick={onDirectionChange}
        />
      </ControlGroup>
    </FormGroup>
  );
};

export const TagList = ({ tags, onItemClick }: TagListProps) => {
  const [selectedTag, setSelectedTag] = useState<string>();
  return (
    <HTMLTable condensed striped>
      <thead>
        <tr>
          <th>Tag</th>
          <th>Số bài viết</th>
        </tr>
      </thead>
      <tbody>
        {tags.map((tag, index) => (
          <tr key={index}>
            <td>
              <Tag
                intent={tag.value === selectedTag ? "danger" : "primary"}
                interactive
                onClick={() => {
                  const nextSelectedTag =
                    tag.value === selectedTag ? undefined : tag;
                  onItemClick && onItemClick(nextSelectedTag);
                  setSelectedTag(nextSelectedTag?.value);
                }}
              >
                {tag.value}
              </Tag>
            </td>
            <td>{tag.postCount ?? 0}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
};
