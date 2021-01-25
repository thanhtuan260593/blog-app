import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
export const PostContent = ({ children }: { children: string }) => {
  return <MarkdownPreview parserOptions={{}}>{children}</MarkdownPreview>;
};
