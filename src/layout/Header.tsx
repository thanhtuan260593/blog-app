import * as React from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarGroup,
  InputGroup,
} from "@blueprintjs/core";
import { UserDropdown } from "./UserDropdown";
import { NavMenu } from "./NavMenu";
import { SearchPost } from "components/Comment/SearchPost";

export const Header = () => {
  return (
    <Navbar fixedToTop className="navbar">
      <NavbarGroup align="left">
        <NavMenu />
      </NavbarGroup>
      <NavbarGroup align="center">
        <div style={{ flex: "1 1 auto" }}>
          <SearchPost />
        </div>
        <NavbarDivider />
        <UserDropdown />
      </NavbarGroup>
    </Navbar>
  );
};
