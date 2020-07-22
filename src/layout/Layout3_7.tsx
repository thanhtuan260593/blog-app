import React from "react";

interface Layout3_7Prop {
  children: JSX.Element[];
}

export const Layout3_7 = (props: Layout3_7Prop) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="content" style={{ flexGrow: 7 }}>
        {props.children[0]}
      </div>
      <div className="right-sidebar" style={{ flexGrow: 3 }}>
        {props.children[1]}
      </div>
    </div>
  );
};
