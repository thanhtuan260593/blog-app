import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"], // blocks
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }], // lists
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults
  [{ font: [] }], // font family
  [{ align: [] }], // text align
  ["clean"], // remove formatting
];

const modules = { toolbar };

const formats = [
  "header",
  "font",
  "background",
  "color",
  "code",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "script",
  "align",
  "direction",
  "link",
  "image",
  "code-block",
  "formula",
  "video",
];

interface MyQuillEditorProps {
  onChange: (value: string) => void;
  value?: string;
}

export function MyQuillEditor(props: MyQuillEditorProps) {
  const [value, setValue] = useState(props.value);
  const handleChange = (value: string) => {
    props.onChange(value);
    setValue(value);
  };
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      value={value}
      onChange={handleChange}
    />
  );
}
