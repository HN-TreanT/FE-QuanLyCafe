import React from "react";
import { Image } from "antd";
import DataEmpty from "../../assets/empty-data.jpg";
import "./ImageEmptyData.scss";
export const ImageEmptyData: React.FC = () => {
  return (
    <div className="empty-data">
      <Image
        className="image-empty-data"
        src={DataEmpty}
        width={110}
        height={110}
        preview={false}
      />
    </div>
  );
};
