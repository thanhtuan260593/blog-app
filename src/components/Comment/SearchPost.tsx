import React, { useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import { TagSelect } from "components/Tag/TagSelect";
import { TagOnEnterEvent } from "resources/models/TagProps";
import { postAPI } from "resources/api/post";
import { useHistory } from "react-router-dom";
const queryString = require("query-string");
export const SearchPost = () => {
  const history = useHistory();
  const handleSearch = (event: TagOnEnterEvent) => {
    event.event.stopPropagation();
    const keywords = event.text.trim().split(" ");
    const tags = event.tags;
    history.push(
      queryString.stringifyUrl({
        url: "/search",
        query: { tags: tags, keywords },
      })
    );
  };
  return <TagSelect fill onEnter={handleSearch} />;
};
