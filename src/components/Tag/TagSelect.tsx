import React, { useState, useEffect } from "react";
import { MultiSelect, ItemRenderer } from "@blueprintjs/select";
import { TagProps, TagSelectProp } from "resources/models/TagProps";
import { MenuItem, Button } from "@blueprintjs/core";
import { tagAPI } from "resources/api/tag";
import { useDebouncedSearch } from "components/Comment/useDebouncedSearch";

const TagMultiSelect = MultiSelect.ofType<TagProps>();
const getTagProps = (tags?: string[]) => {
  if (tags == null) return [] as TagProps[];
  return tags.map((tag) => {
    const p: TagProps = {
      value: tag,
    };
    return p;
  });
};
const useSearch = () =>
  useDebouncedSearch<TagProps[]>((text) =>
    tagAPI.get(text ?? "").then((u) => u ?? [])
  );
export const TagSelect = (props: TagSelectProp) => {
  const { inputText, setInputText, searchResults } = useSearch();

  // const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagProps[]>(
    getTagProps(props.value)
  );

  const handleSelect = (tag: TagProps) => {
    setSelectedTags((tags) => {
      const existed = tags.reduce((pre, cur) => {
        if (cur.value === tag.value) return true;
        return pre;
      }, false);
      if (existed) return tags;
      const rs = [...tags, tag];
      setInputText("");
      props.onChange && props.onChange(rs);
      return rs;
    });
    props.onSelect && props.onSelect(tag.value);
  };
  const handleRemove = (value: string) => {
    setSelectedTags((tags) => {
      const rs = tags.reduce((pre, cur) => {
        if (cur.value === value) return pre;
        return [...pre, cur];
      }, [] as TagProps[]);
      props.onChange && props.onChange(rs);
      return rs;
    });
    props.onRemove && props.onRemove(value);
  };
  const handleClear = () => {
    setSelectedTags([]);
    setInputText("");
  };
  const handleQueryChange = (search: string) => {
    setInputText(search);
  };

  const clearButton =
    searchResults.result && searchResults.result.length > 0 ? (
      <Button icon="cross" minimal={true} onClick={handleClear} />
    ) : undefined;

  const itemRender: ItemRenderer<TagProps> = (
    tag: TagProps,
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

  useEffect(() => {
    setInputText("");
  }, []);

  return (
    <TagMultiSelect
      fill={props.fill}
      noResults={<MenuItem disabled={true} text="Không có kết quả" />}
      itemRenderer={itemRender}
      tagRenderer={(tag) => tag.value}
      items={searchResults.result ?? []}
      onItemSelect={handleSelect}
      selectedItems={selectedTags}
      onQueryChange={handleQueryChange}
      query={inputText}
      tagInputProps={{
        onRemove: handleRemove,
        rightElement: clearButton,
        tagProps: { intent: "primary" },
      }}
    />
  );
};
