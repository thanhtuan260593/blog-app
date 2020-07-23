import React from "react";

export const Slide = () => {
  return (
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
  );
};
