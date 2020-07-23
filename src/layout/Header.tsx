import * as React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  InputGroup,
  Position,
  Popover,
  Menu,
  MenuItem,
  Divider,
  Colors,
  Icon,
} from "@blueprintjs/core";
import { IconName } from "@blueprintjs/icons";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
interface MenuItemProps {
  icon: IconName;
  text: string;
  link: string;
}
const items: MenuItemProps[] = [
  { icon: "helper-management", text: "Admin", link: "/admin" },
  { icon: "home", text: "Tin tức", link: "/" },
  { icon: "document", text: "Tài liệu", link: "/documents" },
  { icon: "add", text: "Soạn tin", link: "/create" },
];

export const Header = () => {
  return (
    <Navbar
      style={{
        backgroundColor: Colors.BLUE3,
        borderBottomColor: Colors.RED5,
        borderBottomStyle: "solid",
        borderBottomWidth: "4px",
      }}
    >
      <NavbarGroup align="left">
        <NavbarHeading style={{ color: Colors.WHITE }}>DOMESCO</NavbarHeading>
        <NavbarDivider style={{ borderColor: Colors.WHITE }} />
        {items &&
          items.map((u) => (
            <Link key={u.link} to={u.link}>
              <Button
                minimal
                icon={<Icon icon={u.icon} color={Colors.WHITE} />}
                text={u.text}
                style={{ color: Colors.WHITE }}
              />
            </Link>
          ))}
      </NavbarGroup>
      <NavbarGroup align="right">
        <InputGroup
          type="search"
          style={{ minWidth: "500px" }}
          placeholder="Tìm kiếm"
        />
        <NavbarDivider />
        <Popover
          content={
            <Menu>
              <MenuItem
                key="info-sign"
                icon="info-sign"
                text="Thông tin tài khoản"
              />
              <MenuItem key="password" icon="key" text="Đổi mật khẩu" />
              <Divider />
              <MenuItem key="log-out" icon="log-out" text="Đăng xuất" />
            </Menu>
          }
          position={Position.RIGHT_TOP}
        >
          <Button text="Nguyễn Thanh Tuấn" rightIcon="caret-down" />
        </Popover>
      </NavbarGroup>
    </Navbar>
  );
};
