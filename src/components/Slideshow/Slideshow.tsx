import React, { useState, useEffect } from "react";
import { PostProps } from "resources/models/PostProps";
import { postAPI } from "resources/api/post";
import { Classes } from "@blueprintjs/core";
import { PostMeta } from "components/Post/Post";

const LoadingSlideshowItem = () => {
  return (
    <div className={`slide-item`}>
      <div>
        <div className={`slide-item-image ${Classes.SKELETON}`}></div>
      </div>
    </div>
  );
};

const SlideshowItem = (props: PostProps) => {
  const background = `url(https://domesco.com/pictures/catalog/banner/baner-2020/Banner-HCV-Final.jpg) center center / cover no-repeat rgb(255, 255, 255)`;
  return (
    <div className="slide-item">
      <div>
        <div className="slide-item-image" style={{ background }}></div>
        <div className="header">
          {props.subject}
          <PostMeta post={{ ...props, tags: [] }} minimal />
        </div>
      </div>
    </div>
  );
};

export const Slideshow = () => {
  const [items, setItems] = useState<PostProps[]>();
  const [err, setErr] = useState<string>();
  useEffect(() => {
    postAPI
      .getPosts(0, 4, ["slideshow"])
      .then((posts) => setItems(posts))
      .catch((err) => setErr(err));
  }, []);
  if (items == null && err == null)
    return (
      <div className={`slide-container`}>
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
        <LoadingSlideshowItem />
      </div>
    );

  return (
    <div className="slide-container">
      {items?.map((u) => (
        <SlideshowItem key={u.id} {...u} />
      ))}
    </div>
  );
};
