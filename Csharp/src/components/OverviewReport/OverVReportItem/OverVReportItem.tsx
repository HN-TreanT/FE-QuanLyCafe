import "./OverVReportItem.scss";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  title: String;
  price: String;
}

export const OverVReportItem: React.FC<Props> = ({ icon, title, price }) => {
  return (
    <div className="item-overview-report">
      <div className="icon-item-overview-report">{icon}</div>
      <div className="span-item-overview-report">
        <div className="title">{title}</div>
        <div className="price">{price} đ</div>
      </div>
    </div>
  );
};
