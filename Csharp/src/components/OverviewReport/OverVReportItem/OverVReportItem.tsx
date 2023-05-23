import "./OverVReportItem.scss";
import { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  title: String;
  price: any;
}

export const OverVReportItem: React.FC<Props> = ({ icon, title, price }) => {
  return (
    <div className="item-overview-report">
      <div className="icon-item-overview-report">{icon}</div>
      <div className="span-item-overview-report">
        <div className="title">{title}</div>
        {/* <div className="price">{price} đ</div> */}
        <div className="price">
          {price < 1000000
            ? `${price ? price : 0} đ`
            : ` ${price ? Math.round(price / 10000) / 100 : 0} tr(VNĐ)`}
        </div>
      </div>
    </div>
  );
};
