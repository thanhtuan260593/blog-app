import React from "react";
import { IconButton, Icon, Box } from "@chakra-ui/react";
import { BiSortDown, BiSortUp } from "react-icons/bi";
type OrderDir = 0 | 1;

interface Props {
  value: OrderDir;
  onChange: (value: OrderDir) => void;
}

export const OrderDirSelect = (props: Props) => {
  return (
    <Box border="1px" borderColor="gray.200" rounded="md" overflow="hidden">
      <IconButton
        aria-label="sort-direction"
        icon={<Icon as={props.value === 0 ? BiSortUp : BiSortDown} />}
        onClick={() => props.onChange(props.value === 0 ? 1 : 0)}
      />
    </Box>
  );
};
