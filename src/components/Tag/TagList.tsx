import React from "react";
import { Tag } from "@blueprintjs/core";
import { TagProps } from "resources/models/TagProps";

export const TagList = ({ tags }: { tags: TagProps[] }) => {
  return (
    <div>
      {tags.map((tag) => (
        <Tag large intent="primary" key={tag.value}>
          {tag.value}
        </Tag>
      ))}
    </div>
  );
};
