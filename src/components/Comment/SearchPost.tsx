import React, { useState } from "react";
import { InputGroup } from "@blueprintjs/core";
import { TagSelect } from "components/Tag/TagSelect";

export const SearchPost = () => {
  const [suggest, setSuggest] = useState<string[]>();
  return <TagSelect fill />;
};
