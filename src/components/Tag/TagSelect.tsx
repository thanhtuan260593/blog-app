import React, { useMemo } from "react";
import Select, { ValueType, ActionMeta, InputActionMeta } from "react-select";
import { Tag } from "resources/models/tag";
import { useDebouncedSearch } from "components/comment/useDebouncedSearch";
import { Center, Spinner } from "@chakra-ui/react";
import { TagContext } from "./TagProvider";
import { getTags } from "resources/api/tag";

export interface Props {
  onTagSelect?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  value?: string[];
}
interface TagOption {
  value: string;
  label: string;
}
export const TagSelect = (props: Props) => {
  const [tags, setTags] = React.useState<Tag[]>();
  React.useEffect(() => {
    getTags(100, 0).then(setTags);
  }, []);
  if (tags == null)
    return (
      <Center>
        <Spinner />
      </Center>
    );
  return <Component tags={tags} {...props} />;
};
interface ComponentProps extends Props {
  tags: Tag[];
}
const Component = ({ tags, ...props }: ComponentProps) => {
  const { search } = React.useContext(TagContext);
  const searchFunction = React.useCallback(
    async (newValue: string | undefined) => {
      return await search(0, newValue);
    },
    [search]
  );
  const { inputText, setInputText, searchResults } = useDebouncedSearch(
    searchFunction
  );

  const { options, loading } = useMemo(() => {
    if (searchResults.loading) return { loading: true, options: [] };
    const loading = false;
    if (searchResults.result == null) return { loading, options: [] };
    return {
      loading,
      options: searchResults.result.map((tag) => ({
        value: tag.value,
        label: tag.label,
      })),
    };
  }, [searchResults]);
  const selectedTags = React.useMemo(() => {
    return props.value?.map((value) => ({ label: value, value }));
  }, [props.value]);
  const handleQueryChange = React.useCallback(
    (newValue: string, actionMeta: InputActionMeta) => {
      if (actionMeta.action === "input-change") {
        setInputText(newValue);
      }
    },
    [setInputText]
  );
  const handleSelect = (
    selectedOptions: ValueType<TagOption>,
    meta: ActionMeta<TagOption>
  ) => {
    switch (meta.action) {
      case "select-option":
        meta.option &&
          props.onTagSelect &&
          props.onTagSelect(meta.option.value);
        setInputText("");
        return;
      case "deselect-option":
        meta.option &&
          props.onTagRemove &&
          props.onTagRemove(meta.option.value);
        return;
      case "remove-value":
        meta.removedValue &&
          props.onTagRemove &&
          props.onTagRemove(meta.removedValue.value);
    }
  };
  return (
    <Select
      isMulti
      options={options}
      fill
      isLoading={loading}
      onChange={handleSelect}
      value={selectedTags}
      onItemSelect={handleSelect}
      inputValue={inputText}
      onInputChange={handleQueryChange}
      closeMenuOnScroll={true}
      menuPosition="fixed"
    />
  );
};
