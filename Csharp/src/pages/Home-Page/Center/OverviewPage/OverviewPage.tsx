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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
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
let data: any[] = [
  {
    name: "",
    "Tổng tiền": 0,
  },
  {
    name: "",
    "Tổng tiền": 0,
  },
  {
    name: "",
    "Tổng tiền": 0,
  },
  {
    name: "",
    "Tổng tiền": 0,
  },
  {
    name: "",
    "Tổng tiền": 0,
  },
];
const dataLineEmpty = [
  {
    name: "Tháng 1",
    uv: 0,
    pv: 0,
    //amt: 2400,
  },
  {
    name: "Tháng 2",
    uv: 0,
    pv: 0,
    // amt: 2210,
  },
  {
    name: "Tháng 3",
    uv: 0,
    pv: 0,
    // amt: 2290,
  },
  {
    name: "Tháng 4",
    uv: 0,
    pv: 0,
    //amt: 2000,
  },
  {
    name: "Tháng 5",
    uv: 0,
    pv: 0,
    //amt: 2181,
  },
  {
    name: "Tháng 6",
    uv: 0,
    pv: 0,
    // amt: 2500,
  },
  {
    name: "Tháng 7",
    uv: 3490,
    pv: 4300,
    // amt: 2100,
  },
  {
    name: "Tháng 8",
    uv: 3490,
    pv: 4300,
    //amt: 2100,
  },
  {
    name: "Tháng 9",
    uv: 3490,
    pv: 4300,
    // amt: 2100,
  },
  {
    name: "Tháng 10",
    uv: 3490,
    pv: 4300,
    //amt: 2100,
  },
  {
    name: "Tháng 11",
    uv: 3490,
    pv: 4300,
    // amt: 2100,
  },
  {
    name: "Tháng 12",
    uv: 3490,
    pv: 4300,
    // amt: 2100,
  },
];
const OverviewPage: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const timeState = useSelector((state: any) => state.overview.timeState);
  const overviewData = useSelector((state: any) => state.overview.overviewData);
  const topSellProduct = useSelector((state: any) => state.product.productsTopSell);
  const revenueOverview = useSelector((state: any) => state.overview.revenueOverview);
  const currentYear = new Date();
  let dataLine: any[] = [];
  let dataChart: any[] = [];
  if (Array.isArray(revenueOverview?.currentYear) && Array.isArray(revenueOverview?.preYear)) {
    dataLine = revenueOverview.currentYear.map((item1: any, index: number) => {
      // return revenueOverview.preYear.map((item2: any, index: number) => {
      return {
        name: `Tháng ${index + 1}`,
        [`Năm ${currentYear.getFullYear()}`]: item1 ? item1 : 0,
        [`Năm ${currentYear.getFullYear() - 1}`]: revenueOverview.preYear[index]
          ? revenueOverview.preYear[index]
          : 0,
      };
      // });
    });
  }
  if (Array.isArray(topSellProduct)) {
    dataChart = topSellProduct.map((item: any) => {
      return {
        name: item.Title ? item.Title : "",
        "Tổng tiền": item.Price ? item.Price : 0,
      };
    });
  }
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
          {/* <Col span={12}>
            <div id="report-bill">
              <div className="title_overview " style={{ marginBottom: "13px" }}>
                <span>KHUYẾN MÃI CÒN HẠN</span>
              </div>
              <OverviewReportBill promotions={0} />
            </div>
          </Col> */}
          <Col span={12}>
            <div id="report-bill">
              <div className="title_overview " style={{ marginBottom: "13px" }}>
                <span>THỐNG KÊ SẢN PHẨM BÁN CHẠY</span>
              </div>
              <BarChart
                barSize={30}
                width={600}
                height={232}
                data={dataChart.length > 0 ? dataChart : data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis interval={0} angle={-45} textAnchor="end" dataKey="name" />
                <YAxis
                  tickFormatter={(value: any) =>
                    value < 10000
                      ? `${value ? VND.format(value) : 0}`
                      : ` ${value ? Math.round(value / 10000) / 100 : 0} trĐ`
                  }
                />
                <Tooltip formatter={(value: any) => VND.format(value)} />
                <Legend />
                <Bar dataKey={"Tổng tiền"} fill="#8884d8" />
              </BarChart>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <div id="report-item-sell">
              <div className="title_overview distance">
                <div style={{ marginBottom: "14px" }}>
                  <Col span={24}>
                    <span>THỐNG KÊ DOANH THU</span>
                  </Col>
                </div>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <LineChart
              width={1200}
              height={400}
              data={dataLine}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value: any) =>
                  value < 1000000
                    ? `${value ? VND.format(value) : 0}`
                    : ` ${value ? Math.round(value / 10000) / 100 : 0}tr(VND)`
                }
              />
              <Tooltip formatter={(value: any) => VND.format(value)} />
              <Legend />
              <Line type="monotone" dataKey={`Năm ${currentYear.getFullYear()}`} stroke="#8884d8" />
              <Line
                type="monotone"
                dataKey={`Năm ${currentYear.getFullYear() - 1}`}
                stroke="#82ca9d"
              />
            </LineChart>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OverviewPage;
