import React, { useState } from "react";
import { Space, Select, Row, Col, Modal } from "antd";
import {
  ExclamationCircleFilled,
  CloseCircleFilled,
  ContainerFilled,
  DollarCircleFilled,
  GiftFilled,
  WalletFilled,
} from "@ant-design/icons";
import "./OverviewPage.scss";
import {
  OverVReportItem,
  OverviewReportOther,
  ReportOverviewSell,
  OverviewReportBill,
} from "../../../../components/OverviewReport";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
const reports = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "thisweek",
    label: "Tuần này",
  },
  {
    value: "thismonth",
    label: "Tháng này",
  },
  {
    value: "thisyear",
    label: "Năm nay",
  },
];
const iconReport = {
  padding: "6px 6px",
  backgroundColor: "rgb(163, 168, 175)",
};
const OverviewPage: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const timeState = useSelector((state: any) => state.overview.timeState);
  const overviewData = useSelector((state: any) => state.overview.overviewData);

  const handleValueChange = (value: any) => {
    let time;
    if (value === "today") time = 1;
    if (value === "thisweek") time = 7;
    if (value === "thismonth") time = 30;
    if (value === "thisyear") time = 365;
    dispatch(actions.OverviewAction.timeState(time));
  };
  const handleClickModal = () => {
    setIsOpenModal(true);
  };
  return (
    <div id="overview_page">
      <Modal
        title="Định nghĩa các trường báo cáo tổng quan"
        open={isOpenModal}
        footer={null}
        onCancel={() => {
          setIsOpenModal(false);
        }}
      ></Modal>
      <div className="title_overview distance">
        <span>TỔNG QUAN KINH DOANH</span>
      </div>

      <div className="list_select_report distance ">
        <Space wrap>
          <Select
            defaultValue="today"
            style={{ width: "250px" }}
            onChange={handleValueChange}
            options={reports}
          />
        </Space>
        <div className="support" onClick={handleClickModal}>
          <span>Hướng dẫn</span>
          <ExclamationCircleFilled
            style={{ fontSize: "1rem", paddingLeft: "3px" }}
          />
        </div>
      </div>

      <div className="list-overview-report distance">
        <OverVReportItem
          price="0"
          title="Tiền hàng"
          icon={<WalletFilled style={iconReport} />}
        />
        <OverVReportItem
          price="0"
          title="Hoàn hủy"
          icon={<CloseCircleFilled style={iconReport} />}
        />
        <OverVReportItem
          price="0"
          title="Giảm giá"
          icon={<GiftFilled style={iconReport} />}
        />
        <OverVReportItem
          price="0"
          title="Tiền nhập"
          icon={<ContainerFilled style={iconReport} />}
        />
        <OverVReportItem
          price="0"
          title="Doanh thu"
          icon={<DollarCircleFilled style={iconReport} />}
        />
      </div>

      <div className="overview-report-other distance">
        <Row gutter={[12, 10]}>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="Số khách hàng"
              count="0"
              color="rgb(244, 148, 35)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="Số hóa đơn"
              count="0"
              color="rgb(41, 164, 182)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="TB mặt hàng/hóa đơn"
              count="0"
              color="rgb(118, 64, 239)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="TB doanh thu/hóa đơn"
              count="0"
              color="rgb(244, 98, 141)"
            />
          </Col>
        </Row>
      </div>

      <div>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <div id="report-bill">
              <div className="title_overview " style={{ marginBottom: "13px" }}>
                <span>KHUYẾN MÃI CÒN HẠN</span>
              </div>
              <OverviewReportBill />
            </div>
          </Col>
          <Col span={12}>
            <div id="report-item-sell">
              <div className="title_overview distance">
                <div style={{ marginBottom: "14px" }}>
                  <Col span={18}>
                    <span>MẶT HÀNG BÁN CHẠY</span>
                  </Col>
                </div>
                <ReportOverviewSell />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverviewPage;
