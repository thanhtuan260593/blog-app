import React from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";

interface Layout2Prop {
  children: JSX.Element[];
}

const LargeLayout2 = (props: Layout2Prop) => {
  return (
    <div className="content">
      <div className="container">{props.children[0]}</div>
      <div className="container container-right">{props.children[1]}</div>
    </div>
  );
};
const SmallLayout2 = (props: Layout2Prop) => {
  return (
    <>
      <div className="content">
        <div className="container">{props.children[0]}</div>
      </div>
      <div className="content">
        <div className="container">{props.children[1]}</div>
      </div>
    </>
  );
};

export const Layout2 = (props: Layout2Prop) => {
  const size = useScreenSize();
  if (size === ScreenSize.LARGE) return <LargeLayout2 {...props} />;
  return <SmallLayout2 {...props} />;
};
