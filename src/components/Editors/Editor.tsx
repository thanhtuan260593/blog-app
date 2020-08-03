import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import {
  Editable,
  withReact,
  useSlate,
  Slate,
  ReactEditor,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { Editor, Transforms, createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { Icon, IconName } from "@blueprintjs/core";
import { Button, Toolbar } from "./Components/components";
import { withImages, ImageElement } from "./Components/ImageElement";

const HOTKEYS: { [id: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
interface RichTextViewerProps {
  initialValue: string;
}
export const RichTextViewer = ({ initialValue }: RichTextViewerProps) => {
  const [value, setValue] = useState<Node[]>([]);
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  useEffect(() => {
    if (initialValue == null) {
      return;
    }
    try {
      const nodes: Node[] = JSON.parse(initialValue);
      setValue(nodes);
    } catch {
      setValue([]);
    }
  }, [initialValue]);
  if (value == null) {
    return <div>Loading...</div>;
  }
  return (
    <Slate editor={editor} value={value} onChange={() => {}}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

interface RichTextEditor {
  onChange: (value: string) => void;
  initialValue: string;
  clear?: () => string;
}

const RichTextEditor = ({ onChange, initialValue, clear }: RichTextEditor) => {
  const [value, setValue] = useState<Node[]>(JSON.parse(initialValue));
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    []
  );
  const handleChange = (value: Node[]) => {
    setValue(value);
    if (value == null) return "[]";
    onChange(JSON.stringify(value));
  };
  useEffect(() => {
    clear && setValue(JSON.parse(clear()));
  }, [clear]);

  return (
    <Slate editor={editor} value={value} onChange={handleChange}>
      <Toolbar>
        <MarkButton format="bold" icon="bold" />
        <MarkButton format="italic" icon="italic" />
        <MarkButton format="underline" icon="underline" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="header-one" />
        <BlockButton format="heading-two" icon="header-two" />
        <BlockButton format="block-quote" icon="code-block" />
        <BlockButton format="numbered-list" icon="numbered-list" />
        <BlockButton format="bulleted-list" icon="properties" />
      </Toolbar>
      <Editable
        className="richtext-editor"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event.nativeEvent)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor: ReactEditor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: ReactEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: ReactEditor, format: string) => {
  const iter = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  const [match] = Array.from(iter);

  return !!match;
};

const isMarkActive = (editor: ReactEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case "image":
      return (
        <ImageElement
          attributes={attributes}
          children={children}
          element={element}
        />
      );
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

interface ToolbarButtonProps {
  format: string;
  icon: IconName;
}

const BlockButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

const MarkButton = ({ format, icon }: ToolbarButtonProps) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon icon={icon} />
    </Button>
  );
};

export default RichTextEditor;
