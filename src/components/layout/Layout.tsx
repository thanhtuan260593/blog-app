import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";
interface Props extends ChakraProps {
  children: React.ReactNode;
}
export const Layout = ({ children, ...props }: Props) => (
  <Box px={8} py={4} {...props}>
    {children}
  </Box>
);
