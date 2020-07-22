import React, { useState, useEffect } from "react";
import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { TagProp, TagSelectProp } from "./TagProp";
import { MenuItem, Tag, Button } from "@blueprintjs/core";
import { tagAPI } from "resources/api/tag";

const TagMultiSelect = MultiSelect.ofType<TagProp>();
export const TagSelect = (props: TagSelectProp) => {
  const [tags, setTags] = useState<TagProp[]>([]);
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagProp[]>([]);
  const handleSelect = (tag: TagProp) => {
    setSelectedTags((tags) => {
      const existed = tags.reduce((pre, cur) => {
        if (cur.value == tag.value) return true;
        return pre;
      }, false);
      if (existed) return tags;
      const rs = [...tags, tag];
      props.onChange(rs);
      setQuery("");
      return rs;
    });
  };
  const handleRemove = (value: string) => {
    setSelectedTags((tags) => {
      const rs = tags.reduce((pre, cur) => {
        if (cur.value == value) return pre;
        return [...pre, cur];
      }, [] as TagProp[]);
      props.onChange(rs);
      return rs;
    });
  };
  const handleClear = () => setSelectedTags([]);
  const handleQueryChange = (search: string) => {
    tagAPI.get(search).then(setTags);
    setQuery(search);
  };

  const clearButton =
    tags.length > 0 ? (
      <Button icon="cross" minimal={true} onClick={handleClear} />
    ) : undefined;

  const itemRender: ItemRenderer<TagProp> = (
    tag: TagProp,
    { modifiers, handleClick }
  ) => {
    return (
      <MenuItem
        active={modifiers.active}
        onClick={handleClick}
        key={tag.value}
        text={tag.value}
        shouldDismissPopover={false}
      />
    );
  };

  return (
    <TagMultiSelect
      noResults={<MenuItem disabled={true} text="Không có kết quả" />}
      itemRenderer={itemRender}
      tagRenderer={(tag) => tag.value}
      items={tags}
      onItemSelect={handleSelect}
      selectedItems={selectedTags}
      onQueryChange={handleQueryChange}
      query={query}
      tagInputProps={{
        onRemove: handleRemove,
        rightElement: clearButton,
        tagProps: { intent: "none", minimal: true },
      }}
    />
  );
};
