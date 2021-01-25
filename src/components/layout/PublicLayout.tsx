import React from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Layout } from "./Layout";
import { PostShortcut } from "components/post/PostShortcut";
import { PostByTags } from "components/post/PostByTags";
import { TagContext } from "components/tag/TagProvider";
import Sticky from "react-stickynode";
import { Tag } from "resources/models/tag";
interface Props {
  children: React.ReactNode;
  subElement: React.ReactNode;
}

const FeatureSection = (props: Props) => (
  <Box px={2} pb={12}>
    {props.subElement}
  </Box>
);
const LargeLayout3 = (props: Props) => {
  return (
    <Layout>
      <Flex direction="row" w="100%">
        <Box w={250} flexBasis={250} flexGrow={0} flexShrink={0} pr={8}>
          <Sticky top={80}>
            <Box pb={12}>
              <PostShortcut />
            </Box>
          </Sticky>
        </Box>
        <Box w={0} flex={1}>
          {props.children}
        </Box>
        <Box w={350} flexBasis={350} flexGrow={0} flexShrink={0} pl={8}>
          <Sticky top={80}>
            <FeatureSection {...props} />
          </Sticky>
        </Box>
      </Flex>
    </Layout>
  );
};

const MediumLayout3 = (props: Props) => {
  return (
    <Layout>
      <Flex direction="row">
        <Box w={0} flex={1}>
          {props.children}
        </Box>
        <Box w={350} flexBasis={350} flexGrow={0} flexShrink={0} pl={8}>
          <Sticky top={80}>
            <FeatureSection {...props} />
          </Sticky>
        </Box>
      </Flex>
    </Layout>
  );
};

const SmallLayout3 = (props: Props) => {
  return (
    <Layout>
      <Flex direction="column">
        <Box>{props.children}</Box>
        <Divider my={6} />
        <FeatureSection {...props} />
      </Flex>
    </Layout>
  );
};

export const PublicLayout = (props: Props) => {
  const component = useBreakpointValue({
    base: <SmallLayout3 {...props} />,
    md: <MediumLayout3 {...props} />,
    lg: <LargeLayout3 {...props} />,
  });
  if (component == null) return <Spinner />;
  return component;
};

export const FeaturePublicLayout = (props: { children: React.ReactNode }) => {
  const { tags } = React.useContext(TagContext);
  const [selectedTag, setSelectedTag] = React.useState<Tag>();
  React.useEffect(() => {
    if (tags == null) return;
    if (selectedTag != null) return;
    const randNumber = Math.floor(
      Math.random() * Math.min(tags.length - 1, 20)
    );
    setSelectedTag(tags[randNumber]);
  }, [tags, selectedTag]);
  return (
    <PublicLayout
      subElement={
        selectedTag && (
          <Box>
            <Center pb={4}>
              <Heading size="md">{selectedTag.label}</Heading>
            </Center>
            <PostByTags
              displayType="list"
              tags={[selectedTag.value]}
              showImage={false}
              showTag={false}
              minimal
            />
          </Box>
        )
      }
    >
      {props.children}
    </PublicLayout>
  );
};
