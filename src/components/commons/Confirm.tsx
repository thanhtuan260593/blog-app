import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  isOpen: boolean;
  title: string;
  description?: string;
  colorScheme?: string;
  onClose: () => void;
  onConfirm: () => void;
}
export const ConfirmAlert = (props: Props) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const confirm = () => {
    props.onClose();
    props.onConfirm();
  };
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {props.title}
          </AlertDialogHeader>

          {props.description && (
            <AlertDialogBody>{props.description}</AlertDialogBody>
          )}

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={props.onClose}>
              Cancel
            </Button>
            <Button colorScheme={props.colorScheme} onClick={confirm} ml={3}>
              Xác nhận
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
