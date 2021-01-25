import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Button,
  FormControl,
  Box,
  HStack,
  Input,
  Center,
  Spinner,
  InputLeftElement,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormLabel,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  ButtonGroup,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { Tag } from "resources/models/tag";
import { TagList } from "components/tag/TagList";
import { RequestError } from "resources/api/helper";
import { useDebouncedSearch } from "components/comment/useDebouncedSearch";
import { SearchIcon } from "@chakra-ui/icons";
import { Tags } from "./Tags";
import { LoadingModal } from "components/commons/LoadingModal";
import {
  addTag,
  deleteTag,
  getRelatedTags,
  getTags,
  updateTag,
} from "resources/api/tag";
import { useReactOidc } from "@axa-fr/react-oidc-context";

interface TagCreateProps {
  onSuccess?: (tag: Tag) => {};
  onFailed?: (err: RequestError) => {};
  onCancel?: () => {};
}

export const TagCreate = (props: TagCreateProps) => {
  const [value, setValue] = useState<string>("");
  const { oidcUser } = useReactOidc();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
  };
  const handleSave = () => {
    addTag(value, oidcUser.access_token)
      .then((tag) => {
        alert("Save");
        setValue("");
        tag && props.onSuccess && props.onSuccess(tag);
      })
      .catch((err: RequestError) => props.onFailed && props.onFailed(err));
  };
  return (
    <>
      <FormControl>
        <InputGroup
          placeholder="Tên tag"
          value={value}
          name="tag"
          onChange={handleChange}
        />
      </FormControl>
      <Button icon="add" intent="success" onClick={handleSave}></Button>
    </>
  );
};
interface TagUpdateProps {
  tag: Tag;
  onClose: () => void;
  onChange: (tag: Tag) => void;
  onDelete: () => void;
}
const toastUpdateSuccess: UseToastOptions = {
  title: "Cập nhật tag",
  description: "Cập nhật tag thành công",
  status: "success",
  isClosable: true,
};
const toastUpdateFailed = (e: RequestError) =>
  ({
    title: "Cập nhật tag",
    description: `Cập nhật tag không thành công: ${
      e.message ?? "lỗi không xác định"
    }`,
    status: "error",
    isClosable: true,
  } as UseToastOptions);
const toastDeleteSuccess: UseToastOptions = {
  title: "Xóa tag",
  description: "Xóa tag thành công",
  status: "success",
  isClosable: true,
};
const toastDeleteFailed = (e: RequestError) =>
  ({
    title: "Xóa tag",
    description: `Xóa tag không thành công: ${
      e.message ?? "lỗi không xác định"
    }`,
    status: "error",
    isClosable: true,
  } as UseToastOptions);
export const TagEditorDrawer = ({
  tag,
  onClose,
  onChange,
  onDelete,
}: TagUpdateProps) => {
  const { oidcUser } = useReactOidc();
  const [mode, setMode] = React.useState<"edit" | "view">("view");
  const [loadingMessage, setLoadingMessage] = useState<string>();
  const [editingTag, setEditingTag] = React.useState<Tag>(tag);
  const [relatedTags, setRelatedTags] = React.useState<string[]>();
  const toast = useToast();
  const hasChange = React.useMemo(() => {
    if (tag.label !== editingTag.label) return true;
    if (tag.value !== editingTag.value) return true;
    return false;
  }, [tag, editingTag]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingTag((editingTag) => ({ ...editingTag, [name]: value }));
  };

  const handleDeleteTag = async () => {
    setLoadingMessage("Đang xóa");
    try {
      await deleteTag(tag.value, oidcUser.access_token);
      onDelete();
      toast(toastDeleteSuccess);
    } catch (e) {
      toast(toastDeleteFailed(e));
    }
    setLoadingMessage(undefined);
  };

  const handleSaveChange = async () => {
    setLoadingMessage("Đang cập nhật");
    try {
      const updatedTag = await updateTag(
        tag.value,
        editingTag.label,
        oidcUser.access_token
      );
      onChange(updatedTag);
      setMode("view");
      toast(toastUpdateSuccess);
    } catch (e) {
      toast(toastUpdateFailed(e));
    }
    setLoadingMessage(undefined);
  };

  useEffect(() => {
    getRelatedTags(tag.value, 10, 0).then(setRelatedTags);
  }, [tag]);
  return (
    <>
      <Drawer
        isOpen={true}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton onClick={onClose} />
            <DrawerHeader>Tag</DrawerHeader>
            <DrawerBody>
              <FormControl label="Display name">
                <FormLabel>Display name</FormLabel>
                <Input
                  readOnly={mode === "view"}
                  name="label"
                  value={editingTag.label}
                  variant={mode === "view" ? "filled" : "outline"}
                  placeholder="Type here..."
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl label="Slug">
                <FormLabel>Slug</FormLabel>
                <Input
                  name="value"
                  variant={mode === "view" ? "filled" : "outline"}
                  readOnly={mode === "view"}
                  value={editingTag.value}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Divider my={6} />
              <StatGroup>
                <Stat>
                  <StatLabel>Bài viết</StatLabel>
                  <StatNumber>{tag.postCount}</StatNumber>
                </Stat>
              </StatGroup>
              {relatedTags && (
                <Box>
                  <FormLabel>Tag liên quan</FormLabel>
                  <Tags tagIds={relatedTags} />
                </Box>
              )}
            </DrawerBody>
            <DrawerFooter>
              <ButtonGroup>
                <Button
                  onClick={() =>
                    mode === "view" ? onClose() : setMode("view")
                  }
                >
                  Cancel
                </Button>
                {mode === "edit" && (
                  <Button colorScheme="red" onClick={handleDeleteTag}>
                    Delete
                  </Button>
                )}
                {mode === "view" && (
                  <Button onClick={() => setMode("edit")}>Edit</Button>
                )}
                {mode === "edit" && (
                  <Button
                    disabled={!hasChange}
                    colorScheme="blue"
                    onClick={handleSaveChange}
                  >
                    Save
                  </Button>
                )}
              </ButtonGroup>
            </DrawerFooter>
            <LoadingModal
              isOpen={loadingMessage != null}
              onClose={() => setLoadingMessage(undefined)}
              message={loadingMessage}
            />
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export const TagManage = () => {
  const [tags, setTags] = useState<Tag[]>();
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<Tag>();
  const searchFunction = React.useCallback(async (text?: string) => {
    setTags(undefined);
    const tags = await getTags(100, 0, text);
    setTags(tags);
    setCanLoadMore(tags.length >= 100);
    return tags;
  }, []);
  const { inputText, setInputText, searchResults } = useDebouncedSearch(
    searchFunction
  );

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputText(value);
  };
  const handleLoadMore = React.useCallback(() => {
    if (tags == null) return;
    getTags(100, tags.length, inputText).then((newTags) => {
      setTags([...tags, ...newTags]);
      setCanLoadMore(newTags.length >= 100);
    });
  }, [tags, inputText]);

  const updateItem = (updatedTag: Tag) => {
    setTags((tags) =>
      tags?.map((tag) =>
        tag.value === updatedTag.value
          ? { ...tag, label: updatedTag.label }
          : tag
      )
    );
    setSelectedTag((tag) => (tag ? { ...tag, label: updatedTag.label } : tag));
  };
  const removeItem = () => {
    if (selectedTag == null) return;
    const slug = selectedTag.value;
    setTags((tags) => tags?.filter((tag) => tag.value !== slug));
  };

  return (
    <Box>
      <HStack mb={6}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="Search tags"
            value={inputText}
            onChange={handleSearchValueChange}
          />
        </InputGroup>
      </HStack>
      {tags == null && (
        <Center>
          <Spinner />
        </Center>
      )}
      {searchResults.result && tags && (
        <TagList onItemClick={setSelectedTag} tags={tags} />
      )}
      {searchResults.result && canLoadMore && (
        <Center>
          <Button onClick={handleLoadMore}>Load more</Button>
        </Center>
      )}
      {selectedTag && (
        <TagEditorDrawer
          onClose={() => setSelectedTag(undefined)}
          tag={selectedTag}
          onDelete={removeItem}
          onChange={updateItem}
        />
      )}
    </Box>
  );
};
