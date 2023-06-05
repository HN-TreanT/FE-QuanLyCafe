import React, { useEffect, useState } from "react";
import { Space, Select, Row, Col, Modal, Button } from "antd";
import {
  CloseCircleFilled,
  ContainerFilled,
  DollarCircleFilled,
  GiftFilled,
  WalletFilled,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import "./OverviewPage.scss";
import {
  OverVReportItem,
  OverviewReportOther,
  ReportOverviewSell,
  OverviewReportBill,
} from "../../../../components/OverviewReport";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";

import { VND } from "../../../../const/convertVND";
import * as XLSX from "xlsx";
import moment from "moment";
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
  const timeState = useSelector((state: any) => state.overview.timeState);
  const overviewData = useSelector((state: any) => state.overview.overviewData);
  const topSellProduct = useSelector((state: any) => state.product.productsTopSell);

  useEffect(() => {
    dispatch(actions.OverviewAction.loadData());
    dispatch(actions.ProductActions.GetTopSellProduct());
  }, [actions.OverviewAction, dispatch, timeState, actions.ProductActions]);
  const handleValueChange = (value: any) => {
    let time;
    if (value === "today") time = 1;
    if (value === "thisweek") time = 7;
    if (value === "thismonth") time = 30;
    if (value === "thisyear") time = 365;
    dispatch(actions.OverviewAction.timeState(time));
  };

  let timeSelected;
  if (timeState === 1) timeSelected = "today";
  if (timeState === 7) timeSelected = "thisweek";
  if (timeState === 30) timeSelected = "thismonth";
  if (timeState === 365) timeSelected = "thisyear";
  const handleExportExcel = () => {
    const today = moment();
    const formatToday = today.format("DD/MM/YYYY");
    const prevoiusDay = today.subtract(timeState, "days");
    const formatPrevoiusDay = prevoiusDay.format("DD/MM/YYYY");
    let data: any[] = [];
    if (overviewData) {
      data.push({
        "Tiền hàng": overviewData?.MoneyProduct ? VND.format(overviewData.MoneyProduct) : 0,
        "Hoàn hủy": 0,
        "Giảm giá": 0,
        "Tiền nhập": overviewData?.MoneyMaterial ? VND.format(overviewData.MoneyMaterial) : 0,
        "Doanh thu": overviewData?.Revenue ? VND.format(overviewData.Revenue) : 0,
        "Số khách hàng": overviewData?.CustomerNumber ? overviewData?.CustomerNumber : 0,
        "Số hóa đơn": overviewData?.OrderNumber ? overviewData?.OrderNumber : 0,
        "TB mặt hàng/hóa đơn": `${
          overviewData.OrderNumber === 0
            ? "0"
            : (overviewData.ProductNumber / overviewData.OrderNumber).toFixed(2)
        }`,
        "TB doanh thu/hóa đơn": `${
          overviewData.OrderNumber === 0
            ? "0"
            : VND.format(overviewData.Revenue / overviewData.OrderNumber)
        }`,
      });
    }
    const workbook = XLSX.utils.book_new();
    const headerTitle = `Tổng quan từ ${formatPrevoiusDay} đến ${formatToday} `;
    //sheet1
    const sheet = XLSX.utils.json_to_sheet([{}], {
      header: [headerTitle],
    });
    const columnWidths = [
      { wch: 15 },
      { wch: 7 },
      { wch: 7 },
      { wch: 15 },
      { wch: 15 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 15 },
    ];
    const ws = XLSX.utils.sheet_add_json(sheet, data, { origin: "A3" });
    ws["!cols"] = columnWidths;
    XLSX.utils.book_append_sheet(workbook, sheet);
    XLSX.writeFile(workbook, `BaocaoTongQuan-${formatToday}.xls`);
  };
  return (
    <div id="overview_page">
      <div className="title_overview distance">
        <span>TỔNG QUAN KINH DOANH</span>
      </div>

      <div className="list_select_report distance ">
        <Space wrap>
          <Select
            defaultValue={timeSelected ? timeSelected : "thismonth"}
            style={{ width: "250px" }}
            onChange={handleValueChange}
            options={reports}
          />
        </Space>
        <div className="support">
          <Button
            style={{ marginLeft: "20px", color: "green", border: "1px solid green" }}
            onClick={handleExportExcel}
          >
            <FontAwesomeIcon icon={faFileExcel} fontSize={20} style={{ paddingRight: "5px" }} />
            Báo cáo
          </Button>
        </div>
      </div>

      <div className="list-overview-report distance">
        <OverVReportItem
          price={overviewData.MoneyProduct}
          title="Tiền hàng"
          icon={<WalletFilled style={iconReport} />}
        />
        <OverVReportItem
          price={0}
          title="Hoàn hủy"
          icon={<CloseCircleFilled style={iconReport} />}
        />
        <OverVReportItem
          price={overviewData.Sale}
          title="Giảm giá"
          icon={<GiftFilled style={iconReport} />}
        />
        <OverVReportItem
          price={overviewData.MoneyMaterial}
          title="Tiền nhập"
          icon={<ContainerFilled style={iconReport} />}
        />
        <OverVReportItem
          price={overviewData.Revenue}
          title="Doanh thu"
          icon={<DollarCircleFilled style={iconReport} />}
        />
      </div>

      <div className="overview-report-other distance">
        <Row gutter={[12, 10]}>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="Số khách hàng"
              count={overviewData.CustomerNumber}
              color="rgb(244, 148, 35)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="Số hóa đơn"
              count={overviewData.OrderNumber}
              color="rgb(41, 164, 182)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="TB mặt hàng/hóa đơn"
              count={`${
                overviewData.OrderNumber === 0
                  ? "0"
                  : (overviewData.ProductNumber / overviewData.OrderNumber).toFixed(2)
              }`}
              color="rgb(118, 64, 239)"
            />
          </Col>
          <Col xl={6} sm={12}>
            <OverviewReportOther
              title="TB doanh thu/hóa đơn"
              count={`${
                overviewData.OrderNumber === 0
                  ? "0"
                  : VND.format(overviewData.Revenue / overviewData.OrderNumber)
              }`}
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
              <OverviewReportBill promotions={0} />
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
                <ReportOverviewSell data={topSellProduct} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverviewPage;
