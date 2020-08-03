import {
  IconName,
  Button,
  Icon,
  Colors,
  Menu,
  MenuItem,
  Position,
  NavbarHeading,
  NavbarDivider,
  Drawer,
  Classes,
} from "@blueprintjs/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { routes } from "constants/routes";

interface MenuItemProps {
  icon: IconName;
  text: string;
  link: string;
}
const items: MenuItemProps[] = [
  { icon: "helper-management", text: "Admin", link: "/admin" },
  { icon: "home", text: "Tin tức", link: "/" },
  { icon: "document", text: "Tài liệu", link: "/documents" },
  { icon: "add", text: "Soạn tin", link: routes.postCreate.getPath() },
];

export const NavMenu = () => {
  const size = useScreenSize();
  if (size === ScreenSize.LARGE) return <LargeNavMenu />;
  return <SmallNavMenu />;
};

export const LargeNavMenu = () => {
  return (
    <>
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
    </>
  );
};

export const SmallNavMenu = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button minimal color="white" onClick={() => setOpen(true)}>
        <img
          alt="DOMESCO icon"
          width="30"
          height="30"
          src={`${process.env.PUBLIC_URL}/favicon.png`}
        />
      </Button>
      <NavbarDivider />
      <Drawer
        icon="menu"
        onClose={handleClose}
        title="Menu"
        isOpen={open}
        position={Position.LEFT}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            <Menu>
              {items.map((item) => (
                <MenuItem key={item.link} text={item.text} icon={item.icon} />
              ))}
            </Menu>
          </div>
        </div>
      </Drawer>
    </>
  );
};
