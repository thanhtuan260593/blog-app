import React from "react";
import { Tag, Divider } from "@blueprintjs/core";
const tags = [
  "thông báo",
  "tin tức",
  "sự kiện",
  "văn bản",
  "hướng dẫn",
  "at-sk-cl-mt",
  "kinh doanh",
  "hoạt động",
  "sản xuất",
  "tài chính",
];
const all = "tất cả";
export const TagMenu = () => {
  return (
    <div className="tag-bar">
      <Tag
        className="tag-item"
        key={all}
        large
        interactive
        active
        intent="primary"
      >
        {all}
      </Tag>
      <Divider />
      {tags.map((u) => (
        <Tag
          className="tag-item"
          key={u}
          large
          interactive
          active
          intent="primary"
        >
          {u}
        </Tag>
      ))}
    </div>
  );
};
