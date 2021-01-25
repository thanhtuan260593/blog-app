import React from "react";
import { VStack } from "@chakra-ui/react";
import { MarkdownEditor } from "components/editors/Markdown";
import { Alert } from "components/commons/Alert";
interface Props {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  commentId?: number;
  message?: string;
  onMessageChange: (message: string | undefined) => void;
  confirmButton: React.ReactNode;
}
export const View = (props: Props) => (
  <VStack align="stretch">
    <MarkdownEditor
      fixedHeight={200}
      autoFocus={props.autoFocus}
      value={props.value}
      onChange={(value) => props.onChange(value ?? "")}
      onBlur={props.onBlur}
    />
    {props.confirmButton}
    {props.message && (
      <Alert onClose={() => props.onMessageChange(undefined)}>
        {props.message}
      </Alert>
    )}
  </VStack>
);
