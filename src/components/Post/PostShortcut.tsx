import React, { useState, useEffect, useMemo } from "react";
import {
  IconName,
  Icon,
  InputGroup,
  Classes,
  Drawer,
  Button,
  Position,
} from "@blueprintjs/core";
import { useLocation, useHistory } from "react-router-dom";
const queryString = require("query-string");
var classNames = require("classnames");
interface MenuItemProps {
  text: string;
  icon?: IconName;
  tags?: string[];
  children?: MenuItemProps[];
  level: number;
  onChildMouseEnter?: () => void;
  onChildMouseLeave?: () => void;
}
interface MenuProps {
  level: number;
  items?: MenuItemProps[];
  onChildMouseEnter?: () => void;
  onChildMouseLeave?: () => void;
}

const Menu = (props: MenuProps) => {
  if (props.items == null) return <div></div>;
  return (
    <div className="menu">
      {props.items.map((u) => (
        <MenuItem
          key={u.text}
          text={u.text}
          icon={u.icon}
          tags={u.tags}
          children={u.children}
          level={props.level}
          onChildMouseEnter={() =>
            props.onChildMouseEnter && props.onChildMouseEnter()
          }
          onChildMouseLeave={() =>
            props.onChildMouseLeave && props.onChildMouseLeave()
          }
        />
      ))}
    </div>
  );
};

const MenuItem = (props: MenuItemProps) => {
  const [hover, setHover] = useState<boolean>();
  const [childHover, setChildHover] = useState<boolean>();
  const [showChildren, setShowChildren] = useState<boolean>();
  const history = useHistory();
  const location = useLocation();
  const link = useMemo(() => {
    return queryString.stringifyUrl({
      url: "/post/tags",
      query: { tags: props.tags },
    });
  }, [props.tags]);
  const selected = useMemo(() => {
    const parsed: { tags: string[] | string } = queryString.parse(
      location.search
    );

    const tags = typeof parsed.tags == "string" ? [parsed.tags] : parsed.tags;
    if (tags == null) return false;
    if (props.tags == null) return false;
    if (props.tags.length === 0 && tags.length === 0) return true;
    if (props.tags.length === 0) return false;
    return props.tags.reduce((pre, cur) => {
      if (!pre) return pre;
      return tags.filter((tag) => tag === cur).length > 0;
    }, true);
  }, [location, props.tags]);
  return (
    <div
      className={classNames("menu-item", {
        select: selected ?? false,
        hover: hover && !childHover,
      })}
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
        history.push(link);
      }}
    >
      <div
        className="menu-item-content"
        style={{ paddingLeft: props.level * 10 + "px" }}
      >
        <div>
          {props.icon && <Icon className="icon" icon={props.icon} />}
          {props.text}
        </div>
        <div className="right">
          {props.children && props.children.length > 0 && !showChildren && (
            <Icon
              className="icon"
              icon="arrow-right"
              onClick={(event) => {
                event.stopPropagation();
                setShowChildren(true);
              }}
            />
          )}
          {props.children && props.children.length > 0 && showChildren && (
            <Icon
              className="icon"
              icon="arrow-down"
              onClick={(event) => {
                event.stopPropagation();
                setShowChildren(false);
              }}
            />
          )}
        </div>
      </div>
      {showChildren && (
        <Menu
          items={props.children}
          level={props.level + 1}
          onChildMouseEnter={() => setChildHover(true)}
          onChildMouseLeave={() => setChildHover(false)}
        />
      )}
    </div>
  );
};

const filterItems = (items: MenuItemProps[], words: string[]) => {
  var filtered = items.reduce((pre, item) => {
    if (item.children == null) {
      if (item.tags == null) return pre;
      if (item.tags.length === 0) return [...pre, item];
      const valid =
        words.filter(
          (word) =>
            item.tags != null &&
            item.tags.filter((tag) => tag.match(word)).length > 0
        ).length > 0;
      if (valid) return [...pre, item];
      return pre;
    }

    const children = filterItems(item.children, words) as MenuItemProps[];
    if (children.length === 0) return pre;
    return [...pre, { ...item, children }];
  }, [] as MenuItemProps[]);
  console.log(items, filtered);
  return filtered;
};

export const PostShortcut = () => {
  const [menu, setMenu] = useState<MenuItemProps[]>();
  const [searchedMenu, setSearchedMenu] = useState<MenuItemProps[]>();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    if (menu == null) return menu;
    const words = search.trim().split(" ");

    const items = filterItems(menu, words);
    setSearchedMenu(items);
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/menu.json`)
      .then((response) => response.json())
      .then((json) => {
        setMenu(json as MenuItemProps[]);
        setSearchedMenu(json as MenuItemProps[]);
      });
  }, []);
  return (
    <div className="card inverse">
      <div className="card-header" style={{ margin: "10px" }}>
        <InputGroup fill leftIcon="search" onChange={handleSearch} />
      </div>
      <Menu items={searchedMenu} level={1} />
    </div>
  );
};

export const SmallPostShortcut = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button icon="menu" onClick={() => setOpen((open) => !open)} />
      <Drawer
        icon="menu"
        onClose={() => setOpen(false)}
        title="Menu"
        isOpen={open}
        position={Position.LEFT}
      >
        <div className={`${Classes.DRAWER_BODY} inverse`}>
          <div className={Classes.DIALOG_BODY}>
            <PostShortcut />
          </div>
        </div>
      </Drawer>
    </>
  );
};
