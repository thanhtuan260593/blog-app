import React, { useState, useCallback } from "react";
import {
  Box,
  FormControl,
  Select,
  VStack,
  Progress,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Card } from "components/layout/Card";
import { OrderDirSelect } from "components/commons/filters/OrderDirSelect";
import { Tag as TagModel } from "resources/models/tag";

interface TagListProps {
  tags: TagModel[];
  onItemClick?: (tag?: TagModel) => void;
}

interface OrderSelectProps {
  onChange: (direction: 0 | 1, orderBy: TagOrderByOption) => void;
}

export type TagOrderByEnum = "value" | "postCount" | "lastModifiedPost";
export interface TagOrderByOption {
  value: TagOrderByEnum;
  label: string;
}
const orderOptions: TagOrderByOption[] = [
  {
    label: "Tên tag",
    value: "value",
  },
  { label: "Số bài viết", value: "postCount" },
  { label: "Thời gian cập nhật", value: "lastModifiedPost" },
];

export const OrderSelect = ({ onChange }: OrderSelectProps) => {
  const [orderDirection, setOrderDirection] = useState<0 | 1>(0);
  const [orderBy, setOrderBy] = useState<TagOrderByOption>(orderOptions[0]);

  const onOrderByChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      var filter = orderOptions.filter((o) => o.value === event.target.value);
      if (filter.length === 1) {
        setOrderBy(filter[0]);
        onChange(orderDirection, filter[0]);
      }
    },
    [orderDirection, onChange]
  );
  const handleDirectionChange = React.useCallback(
    (direction: 0 | 1) => {
      setOrderDirection(direction);
      onChange(direction, orderBy);
    },
    [onChange, orderBy]
  );

  return (
    <HStack>
      <FormControl>
        <Select onChange={onOrderByChange} value={orderBy.value}>
          {orderOptions.map((op) => (
            <option value={op.value}>{op.label}</option>
          ))}
        </Select>
      </FormControl>
      <OrderDirSelect value={orderDirection} onChange={handleDirectionChange} />
    </HStack>
  );
};

export const TagList = ({ tags, onItemClick }: TagListProps) => {
  const max = React.useMemo(() => {
    let max = 1;
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      if (tag.postCount == null) continue;
      if (tag.postCount > max) max = tag.postCount;
    }
    return max;
  }, [tags]);
  return (
    <VStack align="stretch">
      {tags.map((tag) => (
        <Card key={tag.value}>
          <Box
            px={4}
            py={2}
            cursor="pointer"
            onClick={() => onItemClick && onItemClick(tag)}
          >
            <Flex align="center">
              <Box fontWeight="bold" flex={1} isTruncated>
                {tag.label}
              </Box>
              <Progress
                flex={3}
                value={((tag.postCount ?? 0) * 100) / max}
                size="xs"
                colorScheme="blue"
              />
            </Flex>
          </Box>
        </Card>
      ))}
    </VStack>
  );
};
