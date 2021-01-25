import React from "react";

import { chakra } from "@chakra-ui/react";
import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";
interface Props extends MDEditorProps {
  fixedHeight?: number | "auto";
}
const WrappedMarkdownEditor = ({ fixedHeight, ...props }: Props) => {
  return <MDEditor {...props} height={fixedHeight} />;
};
const ChakraMarkdownEditor = chakra(WrappedMarkdownEditor);
export const MarkdownEditor = (props: Props) => {
  return (
    <ChakraMarkdownEditor
      px={0}
      mx={0}
      border="1px"
      minHeight={200}
      borderColor="gray.200"
      overflow="hidden"
      boxShadow="none"
      rounded="md"
      pb={10}
      visiableDragbar={false}
      preview="edit"
      {...props}
    />
  );
};
