/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    <Navbar>
      <NavbarGroup align="left">
        <NavbarHeading>DOMESCO</NavbarHeading>
        <NavbarDivider />
        {items &&
          items.map((u) => (
            <Link key={u.link} to={u.link}>
              <Button
                className={Classes.MINIMAL}
                icon={u.icon}
                text={u.text}
                onClick={() => {}}
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
