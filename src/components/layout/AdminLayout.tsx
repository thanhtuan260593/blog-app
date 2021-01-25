import { Box, Flex, VStack } from "@chakra-ui/react";
import { Layout } from "layout/Layout";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export const AdminLayout = ({ children }: Props) => {
  return (
    <Layout>
      <Flex>
        <Box w={300} flexBasis={300} flexGrow={0} flexShrink={0}>
          <VStack align="stretch">
            <span>Posts</span>
            <span>Tags</span>
          </VStack>
        </Box>
        <Box flex={1} w={0}>
          {children}
        </Box>
      </Flex>
    </Layout>
  );
};
