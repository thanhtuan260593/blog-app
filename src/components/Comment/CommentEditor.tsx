import React, { useState } from "react";
import RichTextEditor from "components/Editors/Editor";
import { Button } from "@blueprintjs/core";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export const CreateComment = (props: {
  postId?: number;
  commentId?: number;
  postCallback: (content: string) => Promise<void>;
  onSuccess: () => void;
  onFail: (message: string) => void;
}) => {
  const [content, setContent] = useState<string>(JSON.stringify(initialValue));
  const [clear, setClear] = useState<() => string>();
  const handleSend = () => {
    // pop up sending the comment
    props
      .postCallback(content)
      .then(() => {
        setContent(JSON.stringify(initialValue));
        setClear(() => () => JSON.stringify(initialValue));
        props.onSuccess();
      })
      .catch((err: string) => props.onFail(err));
  };
  return (
    <div className="create-comment">
      <div style={{ margin: "20px 0 5px 0" }}>
        <RichTextEditor
          clear={clear}
          initialValue={JSON.stringify(initialValue)}
          onChange={setContent}
        />
      </div>
      <Button intent="primary" icon="send-message" onClick={handleSend}>
        Gửi bình luận
      </Button>
    </div>
  );
};
