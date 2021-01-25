import React from "react";
import {
  Switch,
  Image,
  FormLabel,
  FormControl,
  Input,
  Grid,
  GridItem,
  Textarea,
  HStack,
  IconButton,
  Icon,
  Box,
  Flex,
} from "@chakra-ui/react";
import { TagSelect } from "components/tag/TagSelect";
import { UpdatePostRequest } from "resources/models/post";
import { MarkdownEditor } from "components/editors/Markdown";
import { MdFileUpload, MdLink } from "react-icons/md";

interface PostContentEditorProps {
  post: UpdatePostRequest;
  tags: string[];
  uploadedCoverImage?: File;
  onTagSelect?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  onChange: (p: UpdatePostRequest) => void;
  onUploadCoverImage: (file: File | undefined) => void;
}

export const PostContentEditor = (props: PostContentEditorProps) => {
  const [content, setContent] = React.useState<string | undefined>(
    props.post.content
  );
  const [subtitle, setSubtitle] = React.useState<string | undefined>(
    props.post.subtitle
  );
  const imageFileRef = React.useRef<HTMLInputElement>(null);
  const handleContentBlur = React.useCallback(() => {
    props.onChange({ ...props.post, content: content ?? "" });
  }, [props, content]);
  const handleSubtitleBlur = React.useCallback(() => {
    props.onChange({ ...props.post, subtitle: subtitle ?? "" });
  }, [props, subtitle]);
  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      props.onChange({ ...props.post, [name]: value });
    },
    [props]
  );
  const handleCanCommentChange = React.useCallback(() => {
    props.onChange({ ...props.post, canComment: !props.post.canComment });
  }, [props]);
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files == null || files.length === 0) return;
    props.onUploadCoverImage(files[0]);
  };
  const handleImageLinkChange = () => {
    props.onChange({
      ...props.post,
      coverImageURL: prompt("Vui lòng điền thông tin hình ảnh:") ?? undefined,
    });
    props.onUploadCoverImage(undefined);
  };
  const coverImageSrc = React.useMemo(() => {
    if (props.uploadedCoverImage)
      return URL.createObjectURL(props.uploadedCoverImage);
    if (props.post.coverImageURL != null && props.post.coverImageURL.length > 0)
      return props.post.coverImageURL;
    return "/no-image.jpg";
  }, [props]);
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6}>
      <GridItem colSpan={3} h={300}>
        <FormControl label="Tiêu đề" mb={4}>
          <FormLabel>Tiêu đề</FormLabel>
          <Input
            bgColor="white"
            placeholder="Tiêu đề"
            value={props.post.title}
            name="title"
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl label="Tóm tắt">
          <FormLabel>Tóm tắt</FormLabel>
          <Textarea
            flex={1}
            rows={8}
            resize="none"
            onBlur={handleSubtitleBlur}
            value={subtitle ?? ""}
            onChange={(e) => setSubtitle(e.target.value)}
            preview="live"
          />
        </FormControl>
      </GridItem>
      <GridItem colSpan={1} h={300}>
        <Flex direction="column" h="100%">
          <HStack>
            <IconButton
              onClick={handleImageLinkChange}
              aria-label="update-image-link"
              icon={<Icon as={MdLink} />}
            />
            <IconButton
              aria-label="upload-file"
              onClick={() => imageFileRef.current?.click()}
              icon={<Icon as={MdFileUpload} />}
            />
          </HStack>
          <Box display="none">
            <input
              accept="image/*"
              ref={imageFileRef}
              onChange={handleImageFileChange}
              type="file"
            />
          </Box>
          <Box flex={1} h={0} py={4}>
            <Image w="100%" h="100%" objectFit="contain" src={coverImageSrc} />
          </Box>
        </Flex>
      </GridItem>
      <GridItem colSpan={4}>
        <FormControl>
          <FormLabel>Nội dung</FormLabel>
          <MarkdownEditor
            fixedHeight="auto"
            minHeight={512}
            onBlur={handleContentBlur}
            value={content}
            onChange={setContent}
            preview="live"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Cho phép bình luận</FormLabel>
          <Switch onChange={handleCanCommentChange}></Switch>
        </FormControl>
        <FormControl>
          <FormLabel>Tags</FormLabel>
          <TagSelect
            value={props.tags}
            onTagSelect={props.onTagSelect}
            onTagRemove={props.onTagRemove}
          />
        </FormControl>
      </GridItem>
    </Grid>
  );
};
