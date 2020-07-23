import React from "react";
import { PostOverviewProps } from "components/Post/PostProp";
import { PostList } from "components/Post/Post";
import { InputGroup, Tag } from "@blueprintjs/core";
import { TagMenu } from "components/TagMenu";
import { PostShortcut } from "components/Post/PostShortcut";
import { PostByTags } from "components/Post/PostByTags";

const posts: PostOverviewProps[] = [
  {
    id: 1,
    tags: ["cntt"],
    subject: "Chính sách bảo mật mới 2020 về công nghệ thông tin",
    overview:
      "Tháng 7-2020, Phòng Công nghệ thông tin vừa ban hàng chính sách mới...",
    createdAt: new Date("2020-07-20").toUTCString(),
    createdBy: "Phòng CNTT",
  },
  {
    id: 2,
    subject: "Sự kiện tổng kết 6 tháng đầu năm",
    overview: "Sự kiện tổng kết 6 tháng đầu năm đã xãy ra rất thành công...",
    createdAt: new Date("2020-07-19").toUTCString(),
    createdBy: "Phòng CNTT",
  },
  {
    id: 3,
    subject: "DOMESCO đoạt danh hiệu công ty kinh doanh tốt nhất 2020",
    overview:
      "Vừa qua, DOMESCO vừa đạt được danh hiệu công ty kinh doanh tốt nhất ...",
    imageURL:
      "https://domesco.com/pictures/catalog/news/news-2020/38hang-vn-clc-22-nam-lien/1.jpg",
    createdAt: new Date("2020-07-21").toUTCString(),
    createdBy: "Phòng CNTT",
  },
];
export const Home = () => {
  return (
    <div className="content">
      <div className="left">
        <PostShortcut />
      </div>
      <div style={{ flexGrow: 1 }}>
        <h2>CÁC BÀI VIẾT NỔI BẬT</h2>
        <PostByTags tags={[]} />
        <PostList showImage showTag posts={posts} />
      </div>
      <div className="right" style={{ width: "300px" }}>
        <h2>THÔNG BÁO</h2>
        <PostByTags tags={["annouce"]} />
      </div>
    </div>
  );
};
