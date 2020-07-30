export interface TagProps {
  value: string;
  isSystem?: boolean;
}

export interface TagOnEnterEvent {
  text: string;
  tags?: string[];
  event: React.KeyboardEvent<HTMLElement>;
}

export interface TagSelectProp {
  onChange?: (tags: TagProps[]) => void;
  onSelect?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  onEnter?: (event: TagOnEnterEvent) => void;
  value?: string[];
  fill?: boolean;
}
