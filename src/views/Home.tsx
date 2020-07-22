import React from "react";
import { PostOverviewProps } from "components/PostProp";
import { PostList } from "components/Post";
import { InputGroup, Tag } from "@blueprintjs/core";
import { TagMenu } from "components/TagMenu";
const tags = [
  "tất cả",
  "thông báo",
  "tin tức",
  "sự kiện",
  "văn bản",
  "hướng dẫn",
];
const posts: PostOverviewProps[] = [
  {
    id: 1,
    postTags: [{ tag: { value: "CNTT" } }],
    subject: "Chính sách bảo mật mới 2020 về công nghệ thông tin",
    overview:
      "Tháng 7-2020, Phòng Công nghệ thông tin vừa ban hàng chính sách mới...",
    dateCreated: new Date("2020-07-20").toUTCString(),
    createdBy: "Phòng CNTT",
  },
  {
    id: 2,
    subject: "Sự kiện tổng kết 6 tháng đầu năm",
    overview: "Sự kiện tổng kết 6 tháng đầu năm đã xãy ra rất thành công...",
    dateCreated: new Date("2020-07-19").toUTCString(),
    createdBy: "Phòng CNTT",
  },
  {
    id: 3,
    subject: "DOMESCO đoạt danh hiệu công ty kinh doanh tốt nhất 2020",
    overview:
      "Vừa qua, DOMESCO vừa đạt được danh hiệu công ty kinh doanh tốt nhất ...",
    imageURL:
      "https://domesco.com/pictures/catalog/news/news-2020/38hang-vn-clc-22-nam-lien/1.jpg",
    dateCreated: new Date("2020-07-21").toUTCString(),
    createdBy: "Phòng CNTT",
  },
];
export const Home = () => {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", margin: "10px 0px" }}>
        <div className="slide-item">
          <div>
            <img
              className="fit"
              src="https://domesco.com/pictures/catalog/news/news-2020/cup-htv1-xe-dap-06-05-20/Cup-HTV-Nim-tin-chin-thng-1.png"
            />
          </div>
        </div>
        <div className="slide-item">
          <div>
            <img
              className="fit"
              src="https://domesco.com/pictures/catalog/news/news-2020/Hinh-So-ket-6-thnag-dau-2020.jpg"
            />
          </div>
        </div>
        <div className="slide-item">
          <div>
            <img
              className="fit"
              src="https://domesco.com/pictures/catalog/news/news-2020/top50cty-kinh-doanh-hieu-qua-nhat-vn/DSC3283-Copy.JPG"
            />
          </div>
        </div>
        <div className="slide-item">
          <div>
            <img
              className="fit"
              src="https://domesco.com/pictures/catalog/news/news-2020/dncdtn202019-06-20/DHCDTN20201.jpg"
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="post-card" style={{ width: "300px" }}>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
          <h3>Văn phòng</h3>
        </div>
        <PostList posts={posts} />
        <div className="post-card" style={{ width: "300px" }}>
          <h3>Nhân viên xuất sắc</h3>
        </div>
      </div>
    </div>
  );
};
