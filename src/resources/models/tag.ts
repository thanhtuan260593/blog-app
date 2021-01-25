export interface Tag {
  value: string;
  label: string;
  isSystem?: boolean;
  postCount?: number;
  lastModifiedAt?: Date;
}

export interface TagOnEnterEvent {
  text: string;
  tags?: string[];
  event: React.KeyboardEvent<HTMLElement>;
}
