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
const reportsCompare = [
  {
    value: "NotCompare",
    label: "Không so sánh",
  },
  {
    value: "previous",
    label: "Giai đoạn trước",
  },
  {
    value: "lastweek",
    label: "Cùng kỳ tuần trước",
  },
  {
    value: "lastmonth",
    label: "Cùng kỳ tháng trước",
  },
  {
    value: "lastyear",
    label: "cùng kỳ năm trước",
  },
];
const reports = [
  {
    value: "today",
    label: "Hôm nay",
  },
  {
    value: "yesterday",
    label: "Hôm qua",
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
  {
    value: "different_time",
    label: "Khoảng thời gian khác",
  },
];
const iconReport = {
  padding: "6px 6px",
  backgroundColor: "rgb(163, 168, 175)",
};
const OverviewPage: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleValueChange = (value: any) => {
    console.log(value);
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
        {/* <div className="item_select_report"></div>  */}

        <Space wrap>
          <Select
            defaultValue="today"
            style={{ width: "250px" }}
            onChange={handleValueChange}
            options={reports}
          />
          <Select
            defaultValue="NotCompare"
            style={{ width: "250px" }}
            onChange={handleValueChange}
            options={reportsCompare}
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
          title="Thuế phí"
          icon={<ContainerFilled style={iconReport} />}
        />
        <OverVReportItem
          price="0"
          title="Doanh thu gồm thuế"
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
                <span>DOANH THU CHƯA HOÀN TẤT</span>
              </div>
              <OverviewReportBill />
            </div>
          </Col>
          <Col span={12}>
            <div id="report-item-sell">
              <div className="title_overview distance">
                <div>
                  <Row>
                    <Col span={18}>
                      <span>MẶT HÀNG BÁN CHẠY</span>
                    </Col>
                    <Col span={6}>
                      <div>
                        <Select
                          defaultValue={5}
                          style={{ width: "150px" }}
                          onChange={handleValueChange}
                          options={[
                            {
                              value: 5,
                              label: "Top 5 sản phầm",
                            },
                            {
                              value: 10,
                              label: "Top 10 sản phẩm",
                            },
                            {
                              value: 15,
                              label: "Top 15 sản phẩm",
                            },
                          ]}
                        />
                      </div>
                    </Col>
                    <ReportOverviewSell />
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverviewPage;
