import React from "react";
import { Select, Icon, Flex, Box } from "@chakra-ui/react";
import { MdSortByAlpha } from "react-icons/md";
const orderBy = [
  { key: "Title", label: "Tiêu đề" },
  { key: "CreatedBy", label: "Người tạo" },
  { key: "CommentCount", label: "Lượt bình luận" },
  { key: "ViewCount", label: "Lượt xem" },
];
interface Props {
  value: string;
  onChange: (value: string) => void;
}
export const OrderBySelect = (props: Props) => {
  return (
    <Box border="1px" borderColor="gray.200" rounded="md" overflow="hidden">
      <Flex direction="row" alignItems="center">
        <Box>
          <Icon mx={2} as={MdSortByAlpha} />
        </Box>
        <Box pl={2} bgColor="white">
          <Select
            variant="unstyled"
            rounded="none"
            value={props.value}
            onChange={(v) => props.onChange(v.target.value)}
          >
            {orderBy.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
    </Box>
  );
};
