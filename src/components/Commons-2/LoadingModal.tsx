import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
interface Props {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
}
export const LoadingModal = (props: Props) => (
  <Modal
    closeOnOverlayClick={false}
    isOpen={props.isOpen}
    onClose={props.onClose}
  >
    <ModalOverlay />
    <ModalContent>
      {props.message && <ModalHeader>{props.message}</ModalHeader>}
      <ModalBody pb={6}>
        <Center>
          <Spinner />
        </Center>
      </ModalBody>
    </ModalContent>
  </Modal>
);
