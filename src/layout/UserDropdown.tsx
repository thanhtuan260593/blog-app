import * as React from "react";
import {
  Button,
  Position,
  Popover,
  Menu,
  MenuItem,
  Divider,
} from "@blueprintjs/core";
import Avatar from "react-avatar";
import useScreenSize, { ScreenSize } from "./useScreenSize";

export const SmallUserDropdown = ({ user }: { user: string }) => {
  return (
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
      <Button minimal rightIcon="caret-down">
        <Avatar
          name={user}
          size="20"
          round
          textSizeRatio={1.5}
          textMarginRatio={0.1}
        />
      </Button>
    </Popover>
  );
};

export const LargeUserDropdown = ({ user }: { user: string }) => {
  return (
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
      <Button text={user} rightIcon="caret-down" />
    </Popover>
  );
};

export const UserDropdown = () => {
  const size = useScreenSize();
  if (size === ScreenSize.LARGE)
    return <LargeUserDropdown user="Nguyễn Thanh Tuấn" />;
  return <SmallUserDropdown user="Nguyễn Thanh Tuấn" />;
};
