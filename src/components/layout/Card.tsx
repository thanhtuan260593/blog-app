import React from "react";
import {
  Box,
  chakra,
  Divider,
  Flex,
  Heading,
  LayoutProps,
  Skeleton,
} from "@chakra-ui/react";
interface Props {
  fluid?: boolean;
  children: React.ReactNode;
  className?: string;
}
interface BodyProps {
  children: React.ReactNode;
}
interface HeaderProps {
  children: React.ReactNode;
  rightElement?: React.ReactNode;
}
export const CardHeaderSkeleton = () => (
  <Box pb={12} px={8} py={4}>
    <Skeleton h="100" w="100%">
      <Heading>Lorem</Heading>
    </Skeleton>
  </Box>
);
export const CardBodySkeleton = (props: LayoutProps) => (
  <Box px={8} py={4}>
    <Skeleton {...props}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </Skeleton>
  </Box>
);

export const CardHeader = (props: HeaderProps) => {
  return (
    <Box px={8} py={4}>
      <Flex direction="row" align="stretch">
        <Heading textAlign="justify" size="lg" as="h4">
          {props.children}
        </Heading>
        <Flex justify="flex-end" flex={1} pl={4}>
          {props.rightElement}
        </Flex>
      </Flex>
      <Divider mt={2} />
    </Box>
  );
};
export const CardBody = (props: BodyProps) => (
  <Box px={8} py={4}>
    {props.children}
  </Box>
);
const cardStyle = {
  borderWidth: { base: 0, md: "1px" },
  borderColor: "gray.200",
  bgColor: "gray.50",
  rounded: { base: "none", md: "md" },
};
const CardComponent = (props: Props) => {
  if (props.fluid)
    return (
      <Box {...cardStyle} className={props.className}>
        {props.children}
      </Box>
    );
  return (
    <Box {...cardStyle} className={props.className}>
      {props.children}
    </Box>
  );
};

export const Card = chakra(CardComponent);
