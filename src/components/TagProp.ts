export interface TagProp {
  value: string;
  isSystem?: boolean;
}

export interface TagSelectProp {
  onChange: (tags: TagProp[]) => void;
}
