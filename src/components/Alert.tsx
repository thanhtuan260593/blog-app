import React, { useState, useEffect } from "react";
import { Intent, Alert as A } from "@blueprintjs/core";

export const Alert = (props: { isOpen: boolean; message: string }) => {
  const [isOpen, setOpen] = useState(props.isOpen);
  const [message, setMessage] = useState(props.message);
  useEffect(() => {
    setOpen(props.isOpen);
    setMessage(props.message);
  }, [props]);
  const close = () => {
    setOpen(false);
  };
  return (
    <A
      cancelButtonText="Cancel"
      icon="error"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={close}
      onClose={close}
    >
      <p>{message}</p>
    </A>
  );
};
