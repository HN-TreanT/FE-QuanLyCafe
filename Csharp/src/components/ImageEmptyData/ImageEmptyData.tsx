import React from "react";
import { Image } from "antd";
import "./ImageEmptyData.scss";
export const ImageEmptyData: React.FC<any> = ({ imagePath, width, height }) => {
  return (
    <div className="empty-data">
      <Image
        className="image-empty-data"
        src={imagePath}
        width={width}
        height={height}
        preview={false}
      />
    </div>
  );
};
