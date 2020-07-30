import React from "react";
import useScreenSize, { ScreenSize } from "./useScreenSize";
import { SmallPostShortcut, PostShortcut } from "components/Post/PostShortcut";
import { PostByTags } from "components/Post/PostByTags";

export const LargeLayout3 = (props: { children: JSX.Element }) => {
  return (
    <div className="content">
      <div className="container container-left">
        <PostShortcut />
      </div>
      <div className="container">{props.children}</div>
      <div className="container container-right">
        <div className="card">
          <div className="card-header">
            <h2>THÔNG BÁO</h2>
          </div>
          <PostByTags tags={["annouce"]} />
        </div>
      </div>
    </div>
  );
};

export const MediumLayout3 = (props: { children: JSX.Element }) => {
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="card inverse">
            <SmallPostShortcut />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">{props.children}</div>
        <div className="container container-right">
          <div className="card">
            <div className="card-header">
              <h2>THÔNG BÁO</h2>
            </div>
            <PostByTags tags={["annouce"]} />
          </div>
        </div>
      </div>
    </>
  );
};

export const SmallLayout3 = (props: { children: JSX.Element }) => {
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="card inverse">
            <SmallPostShortcut />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container">{props.children}</div>
      </div>
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-header">
              <h2>THÔNG BÁO</h2>
            </div>
            <PostByTags tags={["annouce"]} />
          </div>
        </div>
      </div>
    </>
  );
};

export const Layout3 = (props: { children: JSX.Element }) => {
  const size = useScreenSize();
  if (size === ScreenSize.LARGE) return <LargeLayout3 {...props} />;
  if (size === ScreenSize.MEDIUM) return <MediumLayout3 {...props} />;
  return <SmallLayout3 {...props} />;
};
