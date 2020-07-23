import React from "react";

interface Layout3_7Prop {
  children: JSX.Element[];
}

export const Layout3_7 = (props: Layout3_7Prop) => {
  return (
    <div className="content">
      <div style={{ flexGrow: 7 }}>{props.children[0]}</div>
      <div className="right" style={{ width: "300px" }}>
        {props.children[1]}
      </div>
    </div>
  );
};
