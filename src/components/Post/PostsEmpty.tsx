import React from "react";
import { NonIdealState, Tag } from "@blueprintjs/core";
import { TagProps } from "resources/models/TagProps";

export const PostsEmpty = ({ tags }: { tags: TagProps[] }) => {
  return (
    <NonIdealState
      icon="document"
      title="Không có bài viết nào"
      description={
        <div>
          Không có bài viết nào có gắn thẻ
          {tags.map((tag) => (
            <Tag intent="primary">{tag.value}</Tag>
          ))}
        </div>
      }
    />
  );
};
