export interface TagProps {
  value: string;
  isSystem?: boolean;
}

export interface TagSelectProp {
  onChange?: (tags: TagProps[]) => void;
  onSelect?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  value?: string[];
  fill?: boolean;
}
