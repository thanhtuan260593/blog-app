import React from "react";
import {
  Alert as A,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";

interface Props {
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}
export const Alert = (props: Props) => {
  return (
    <A status="error" rounded="md">
      <AlertIcon />
      <Box flex={1}>
        <AlertTitle mr={2}>{props.title ?? "Alert"}</AlertTitle>
        <AlertDescription>{props.children}</AlertDescription>
        {props.onClose && (
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={props.onClose}
          />
        )}
      </Box>
    </A>
  );
};
