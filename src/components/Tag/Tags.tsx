import { TagProps, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { TagLink } from "./Tag";
import { Tag, Tag as TagModel } from "resources/models/tag";
import { TagContext } from "./TagProvider";
interface Props extends TagProps {
  tags?: TagModel[];
  tagIds?: string[];
  showNumber?: boolean;
}
export const Tags = ({
  tags: tagModels,
  tagIds,
  showNumber,
  ...others
}: Props) => {
  const { dictionary, loadTags } = React.useContext(TagContext);
  const tags = React.useMemo(() => {
    if (tagModels != null) return tagModels;
    if (tagIds != null && tagIds.length > 0 && dictionary != null)
      return tagIds.reduce((tags: Tag[], current) => {
        if (current in dictionary) return [...tags, dictionary[current]];
        return tags;
      }, []);
    return [];
  }, [tagModels, tagIds, dictionary]);
  React.useEffect(() => {
    if (tagIds == null) return;
    loadTags(tagIds);
  }, [loadTags, tagIds]);
  return (
    <Wrap spacing={1} wrap="wrap" justify="start">
      {tags.map((tag) => (
        <WrapItem key={tag.value}>
          <TagLink
            key={tag.value}
            colorScheme="blue"
            tag={tag}
            showNumber={showNumber}
            {...others}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};
