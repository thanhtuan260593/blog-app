import React from "react";
import { IconName, Icon } from "@blueprintjs/core";
var classNames = require("classnames");
interface MenuItem {
  text: string;
  icon?: IconName;
  children?: MenuItem[];
  select?: boolean;
}
const menu: MenuItem[] = [
  {
    text: "Thông báo",
    icon: "volume-up",
  },
  {
    text: "Sự kiện",
    icon: "timeline-events",
  },
  {
    text: "Đố vui",
    icon: "help",
    select: true,
  },
  {
    text: "Phòng ban",
    icon: "office",
    children: [
      {
        text: "CNTT",
      },
    ],
  },
];

const renderMenu = (menuItems?: MenuItem[]) => {
  return (
    menuItems && (
      <div className="menu">{menuItems.map((u) => renderItem(u))}</div>
    )
  );
};

const renderItem = (menuItem: MenuItem) => {
  return (
    <div
      className={classNames("menu-item", {
        select: menuItem.select ?? false,
      })}
    >
      {menuItem.icon && <Icon className="icon" icon={menuItem.icon} />}
      {menuItem.text}
      {renderMenu(menuItem.children)}
    </div>
  );
};

export const PostShortcut = () => {
  return (
    <>
      <h2>DANH MỤC</h2>
      {renderMenu(menu)}
    </>
  );
};
