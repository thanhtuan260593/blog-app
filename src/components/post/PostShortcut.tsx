import React, { useState, useMemo } from "react";
import {
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  useLocation,
  useHistory,
  matchPath,
  generatePath,
} from "react-router-dom";
import {
  MdSearch,
  MdHome,
  MdNewReleases,
  MdExpandMore,
  MdExpandLess,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { NewPostButton } from "components/post/NewPostButton";
import { IconType } from "react-icons";
import { routes } from "constants/routes";
import { Tags } from "components/tag/Tags";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { TagContext } from "components/tag/TagProvider";
interface MenuItem {
  text: string;
  icon?: IconType;
  tag?: string;
  href?: string;
  children?: MenuItem[];
  onChildMouseEnter?: () => void;
  onChildMouseLeave?: () => void;
}
const menuData: MenuItem[] = [
  {
    text: "Home",
    icon: MdHome,
    href: "/",
  },
  {
    text: "tuannt",
    icon: MdNewReleases,
    href: "/u/tuannt",
  },
];

interface MenuItemProps {
  text: string;
  icon?: IconType;
  tag?: string;
  href?: string;
  level: number;
  children?: MenuItem[];
  onChildMouseEnter?: () => void;
  onChildMouseLeave?: () => void;
}
interface MenuProps {
  level: number;
  items?: MenuItem[];
  onChildMouseEnter?: () => void;
  onChildMouseLeave?: () => void;
}

const renderMenuItems = (props: MenuProps) =>
  props.items?.map((u) => (
    <MenuItemComponent
      key={u.text}
      text={u.text}
      icon={u.icon}
      tag={u.tag}
      href={u.href}
      children={u.children}
      level={props.level}
      onChildMouseEnter={() =>
        props.onChildMouseEnter && props.onChildMouseEnter()
      }
      onChildMouseLeave={() =>
        props.onChildMouseLeave && props.onChildMouseLeave()
      }
    />
  )) ?? <></>;

const Menu = (props: MenuProps) => {
  if (props.items == null) return <div></div>;
  return (
    <VStack spacing={0} align="stretch">
      {renderMenuItems(props)}
    </VStack>
  );
};

const MenuItemComponent = (props: MenuItemProps) => {
  const [hover, setHover] = useState<boolean>();
  const [showChildren, setShowChildren] = useState<boolean>();
  const history = useHistory();
  const location = useLocation();
  const link = useMemo(() => {
    if (props.href) return props.href;
    if (props.tag) return generatePath(routes.tag.path, { tag: props.tag });
    return undefined;
  }, [props]);
  const selected = useMemo(() => {
    const match = matchPath<{ tag: string }>(
      location.pathname,
      routes.tag.path
    );
    if (match == null) return false;
    return match.params.tag === props.tag;
  }, [location, props.tag]);
  return (
    <>
      <Box
        py={2}
        cursor="pointer"
        bgColor={selected ? "gray.100" : undefined}
        onMouseEnter={() => {
          setHover(true);
          props.onChildMouseEnter && props.onChildMouseEnter();
        }}
        onMouseLeave={() => {
          setHover(false);
          props.onChildMouseLeave && props.onChildMouseLeave();
        }}
        onClick={(event) => {
          event.stopPropagation();
          if (link == null) {
            setShowChildren((expand) => !expand);
            return;
          }
          history.push(link);
        }}
      >
        <Flex
          pl={4 + props.level * 6}
          pr={2}
          alignItems="baseline"
          color={hover ? "blue.500" : undefined}
        >
          <HStack flex={1}>
            <Icon as={props.icon ?? MdKeyboardArrowRight} />
            <Box>{props.text}</Box>
          </HStack>
          <Box>
            {props.children && props.children.length > 0 && !showChildren && (
              <Icon as={MdExpandMore} />
            )}
            {props.children && props.children.length > 0 && showChildren && (
              <Icon as={MdExpandLess} />
            )}
          </Box>
        </Flex>
        {showChildren && (
          <Box pt={3}>
            <Menu items={props.children} level={props.level + 1} />
          </Box>
        )}
      </Box>
    </>
  );
};

const filterItems = (items: MenuItem[], words: string[]) => {
  var filtered = items.reduce((pre, item) => {
    if (item.children == null) {
      if (item.tag == null) return [...pre, item];
      const valid = words.filter((word) => item.tag?.includes(word)).length > 0;
      if (valid) return [...pre, item];
      return pre;
    }

    const children = filterItems(item.children, words) as MenuItem[];
    if (children.length === 0) return pre;
    return [...pre, { ...item, children }];
  }, [] as MenuItem[]);
  return filtered;
};

export const PostShortcut = () => {
  const [query, setQuery] = useState<string>("");
  const [searchedMenu, setSearchedMenu] = useState<MenuItem[]>(menuData);
  const { tags: sourceTags } = React.useContext(TagContext);
  const { oidcUser } = useReactOidc();
  const tags = useMemo(() => {
    return sourceTags
      ?.filter(
        (tag) =>
          tag.postCount &&
          tag.postCount > 0 &&
          tag.value.toLowerCase().includes(query.toLocaleLowerCase())
      )
      .slice(0, 9);
  }, [sourceTags, query]);

  React.useEffect(() => {
    const words = query.trim().split(" ");
    const items = filterItems(menuData, words);
    setSearchedMenu(items);
  }, [query]);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setQuery(search);
  };

  return (
    <Box>
      {oidcUser && (
        <Box mx={4} mb={4}>
          <NewPostButton w="100%" />
        </Box>
      )}
      <Box mx={4} mb={4}>
        <InputGroup>
          <InputLeftElement>
            <Icon as={MdSearch} />
          </InputLeftElement>
          <Input bgColor="gray.50" overflow="hidden" onChange={handleSearch} />
        </InputGroup>
      </Box>
      <Menu items={searchedMenu} level={0} />
      {tags && (
        <Box pl={4} pt={4}>
          <strong>Tags</strong>
          <Box pt={2}>
            <Tags showNumber tags={tags} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
