import {
  Icon,
  Menu,
  MenuItem,
  Drawer,
  Flex,
  Box,
  useBreakpointValue,
  DrawerOverlay,
  DrawerContent,
  HStack,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  MenuButton,
  MenuList,
  Button,
  Link as CLink,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, matchPath, useHistory, useLocation } from "react-router-dom";
import { MdMenu, MdSearch, MdExpandMore, MdArrowForward } from "react-icons/md";
import { LogoIcon } from "components/commons/icons/LogoIcon";
import { PostShortcut } from "components/post/PostShortcut";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { routes } from "constants/routes";
import queryString from "query-string";
export const FullBranding = () => (
  <HStack align="baseline" color="blue.500">
    <span>
      <LogoIcon w="48px" h="30px" mr={1} />
    </span>
    <Box fontSize="xl" fontWeight="extrabold">
      MY-SHELL
    </Box>
  </HStack>
);
export const Branding = () => {
  const visible = useBreakpointValue({ base: false, md: true });
  return (
    <HStack align="baseline" color="blue.500">
      <span>
        <LogoIcon w="48px" h="30px" mr={1} />
      </span>
      {visible && (
        <Box fontSize="lg" fontWeight="extrabold">
          MY-SHELL
        </Box>
      )}
    </HStack>
  );
};
export const NavButton = () => {
  const show = useBreakpointValue({ base: true, lg: false });
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  React.useEffect(() => setIsOpen(false), [location]);
  if (!show) return <></>;
  return (
    <>
      <IconButton
        aria-label="menu"
        variant="link"
        alignSelf="baseline"
        py={0}
        onClick={open}
        icon={
          <span>
            <Icon boxSize="32px" as={MdMenu} />
          </span>
        }
      />
      <NavDrawer open={isOpen} onClose={close} />
    </>
  );
};
export const NavDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={onClose} placement="left" isOpen={open}>
      <DrawerOverlay>
        <DrawerContent
          backgroundColor="gray.50"
          color="gray.600"
          fontSize="lg"
          fontWeight="bold"
        >
          <Center py={3}>
            <FullBranding />
          </Center>
          <PostShortcut />
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

const useBreadcrumbs = () => {
  const location = useLocation();
  const matchTag = matchPath<{ tag: string }>(location.pathname, routes.tag);
  const matchUser = matchPath<{ user: string }>(location.pathname, routes.user);
  if (matchTag) {
    const tag = matchTag.params.tag;
    return [
      {
        href: routes.tag.getPath(tag),
        name: tag,
      },
    ];
  }
  if (matchUser) {
    const user = matchUser.params.user;
    return [
      {
        href: routes.user.getPath(user),
        name: user,
      },
    ];
  }
  return undefined;
};

export const NavMenu = () => {
  const { oidcUser, login, logout } = useReactOidc();
  const [searchValue, setSearchValue] = useState("");
  const breadcrumbs = useBreadcrumbs();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const match = matchPath(location.pathname, routes.search.path);
    if (match != null) {
      const query: { search?: string } = queryString.parse(location.search);
      setSearchValue(query.search ?? "");
    }
  }, [location]);
  const handleSearch = () => {
    if (searchValue.length === 0) return;
    const url = queryString.stringifyUrl({
      url: routes.search.path,
      query: { search: searchValue },
    });
    history.push(url);
  };
  return (
    <Flex
      position="fixed"
      zIndex={1000}
      top={0}
      left={0}
      right={0}
      pt={2}
      pl={4}
      justify="stretch"
      alignItems="baseline"
      direction="row"
      w="100%"
      overflow="hidden"
      borderBottom="1px"
      borderColor="gray.200"
      h={12}
      bgColor="white"
    >
      <NavButton />
      {breadcrumbs == null && (
        <Link to={"/"}>
          <Branding />
        </Link>
      )}
      {breadcrumbs != null && (
        <HStack h={8} align="baseline">
          <CLink as={Link} to="/">
            <span>
              <LogoIcon width="48px" h="30px" />
            </span>
          </CLink>
          {breadcrumbs.map((b, index) => (
            <HStack key={index}>
              <Box key={`${b.name}-splash`}>/</Box>
              <Box h={8} display="inline-flex" alignItems="center">
                <CLink as={Link} key={b.name} to={b.href}>
                  {b.name}
                </CLink>
              </Box>
            </HStack>
          ))}
        </HStack>
      )}
      <Box flex={1} px={4}>
        <InputGroup
          rounded="lg"
          variant="filled"
          size="sm"
          alignItems="baseline"
        >
          <InputLeftElement roundedLeft="lg">
            <span>
              <Icon as={MdSearch} />
            </span>
          </InputLeftElement>
          <Input
            placeholder="Tìm kiếm"
            value={searchValue}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              variant="link"
              onClick={handleSearch}
              aria-label="search"
              icon={<Icon as={MdArrowForward} />}
            />
          </InputRightElement>
        </InputGroup>
      </Box>
      {oidcUser == null && (
        <Box pr={4}>
          <Button py={0} h={8} onClick={() => login()}>
            Đăng nhập
          </Button>
        </Box>
      )}
      {oidcUser != null && (
        <Menu fixed>
          <MenuButton pr={4} alignSelf="baseline">
            <HStack align="baseline" h="100%">
              <Avatar size="xs" name={oidcUser.profile.sub} />
              <span>
                <Icon as={MdExpandMore} />
              </span>
            </HStack>
          </MenuButton>
          <MenuList>
            <a href="https://id.my-shell.com/me">
              <MenuItem>Thông tin tài khoản</MenuItem>
            </a>
            <Link to="/me">
              <MenuItem>Trang của tôi</MenuItem>
            </Link>
            <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
