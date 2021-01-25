import React from "react";
import { batchTags, getTags } from "resources/api/tag";
import { Tag } from "resources/models/tag";
interface Props {
  children: React.ReactNode;
}
export const TagContext = React.createContext<{
  tags?: Tag[];
  dictionary?: { [key: string]: Tag };
  loadTags: (tag: string[]) => Promise<Tag[]>;
  unloadedTags: (tag: string[]) => string[];
  getTags: (tag: string[], offset: number) => Tag[];
  search: (offset: number, inputValue?: string) => Promise<Tag[]>;
}>({
  loadTags: async () => [],
  unloadedTags: () => [],
  getTags: () => [],
  search: async () => [],
});
interface TagDictionary {
  [key: string]: Tag;
}
const toTagDictionary = (tags: Tag[]) => {
  let dictionary: TagDictionary = {};
  if (tags == null) return dictionary;
  for (let i = 0; i < tags.length; i++) {
    dictionary[tags[i].value] = tags[i];
  }
  return dictionary;
};
export const TagProvider = (props: Props) => {
  const [tags, setTags] = React.useState<Tag[]>([]);
  const dictionary = React.useMemo(() => {
    return toTagDictionary(tags);
  }, [tags]);
  const addTags = React.useCallback((addedTags: Tag[]) => {
    setTags((tags) => {
      const newTags = Object.values(toTagDictionary([...tags, ...addedTags]));
      return newTags;
    });
  }, []);
  const handleGetTags = React.useCallback(
    (tags: string[]) => {
      const tagInfos: Tag[] = [];
      for (let i = 0; i < tags.length; i++) {
        if (tags[i] in dictionary) {
          tagInfos.push(dictionary[tags[i]]);
        }
      }
      return tagInfos;
    },
    [dictionary]
  );
  const unloadedTags = React.useCallback(
    (tags: string[]) => {
      const unloadedTags: string[] = [];
      for (let i = 0; i < tags.length; i++) {
        if (!(tags[i] in dictionary)) unloadedTags.push(tags[i]);
      }
      return unloadedTags;
    },
    [dictionary]
  );
  const loadTags = React.useCallback(
    async (tags: string[]) => {
      if (tags.length === 0) return [];
      let reloadedTagsInfo = await batchTags(tags);
      addTags(reloadedTagsInfo);
      return reloadedTagsInfo;
    },
    [addTags]
  );
  const search = React.useCallback(
    async (offset: number, inputValue?: string) => {
      var newTags = await getTags(100, offset, inputValue);
      addTags(newTags);
      return newTags;
    },
    [addTags]
  );
  React.useEffect(() => {
    getTags(100, 0).then(setTags);
  }, []);
  return (
    <TagContext.Provider
      value={{
        tags,
        dictionary,
        loadTags,
        getTags: handleGetTags,
        unloadedTags,
        search,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
