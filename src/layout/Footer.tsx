import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Classes, AnchorButton, Menu } from "@blueprintjs/core";

interface Props {
  className?: string;
}

export const Footer = (props: Props) => {
  const menuStyle = { margin: -5, padding: 0, marginBottom: 5 };
  return (
    <footer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: 5 }}>
          <span className={Classes.TEXT_MUTED}>©&nbsp;</span>
          <span>{Math.max(new Date().getFullYear(), 2019)} DOMESCO</span>
        </div>
        <div>
          <AnchorButton minimal icon={IconNames.PHONE} href="#">
            Hotline: 0787 036 144
          </AnchorButton>
        </div>
        <div>
          <AnchorButton
            minimal
            icon={IconNames.MAP_MARKER}
            rightIcon={IconNames.SHARE}
            target="blank"
            href="#"
          >
            37 Thành Thái, Quận 10, TP HCM
          </AnchorButton>
        </div>
      </div>
    </footer>
  );
};
