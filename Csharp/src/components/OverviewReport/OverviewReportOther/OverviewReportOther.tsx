import React from "react";
import "./OverviewReportOther.scss";

interface Props {
  title: String;
  count: String;
  color: String;
}
export const OverviewReportOther: React.FC<Props> = ({
  title,
  count,
  color,
}) => {
  return (
    <div
      className={`overview-report-other-item `}
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="title" style={{ color: `${color}` }}>
        {title}
      </div>
      <div className="count">{count}</div>
    </div>
  );
};
