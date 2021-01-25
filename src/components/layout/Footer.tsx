import { Box, Center } from "@chakra-ui/react";
import React from "react";

interface Props {
  className?: string;
}

export const Footer = (props: Props) => {
  return (
    <Box position="fixed" bottom={0} left={0} right={0} bgColor="gray.400">
      <Center h={6}>
        <span>©&nbsp;</span> 2020 Nguyễn Thanh Tuấn
      </Center>
    </Box>
  );
};
