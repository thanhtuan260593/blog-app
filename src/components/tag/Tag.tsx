import {
  Box,
  Tag as CTag,
  TagProps,
  Link as CLink,
  TagLeftIcon,
} from "@chakra-ui/react";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import { routes } from "constants/routes";
import { Tag as TagModel } from "resources/models/tag";
import { TagIconSet } from "./TagIcon";
interface Props extends TagProps {
  tag: TagModel;
  showNumber?: boolean;
}
export const TagLink = ({ tag, showNumber, ...others }: Props) => {
  const icon = tag.value in TagIconSet ? TagIconSet[tag.value] : undefined;
  return (
    <CLink
      as={Link}
      to={generatePath(routes.tag.path, {
        tag: tag.value === "" ? "#" : tag.value,
      })}
    >
      <CTag {...others}>
        {icon && <TagLeftIcon as={icon} />}
        {tag.label}
        {tag.postCount != null && showNumber && (
          <Box as="span" ml={2}>{`(${tag.postCount})`}</Box>
        )}
      </CTag>
    </CLink>
  );
};
