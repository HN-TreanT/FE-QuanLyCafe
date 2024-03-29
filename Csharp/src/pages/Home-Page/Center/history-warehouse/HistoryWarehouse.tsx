import React, { useEffect } from "react";
import { Row, Col, Table, DatePicker, Space, Button, Form } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDispatch, useSelector } from "react-redux";
import useAction from "../../../../redux/useActions";
import "./HistoryWarehouse.scss";
import dayjs from "dayjs";

interface DataType {
  key: string;
  CreatedAt: string;
  NameMaterial: string;
  Amount: Number;
  Unit: string;
}
const HistoryWarehouse: React.FC = () => {
  let data: any[] = [];
  const columns: ColumnsType<DataType> = [
    {
      title: "Ngày tạo",
      dataIndex: "CreatedAt",
    },
    {
      title: "Nguyên liệu",
      dataIndex: "NameMaterial",
    },
    {
      title: "Thay đổi",
      dataIndex: "Amount",
      render: (text) => (
        <div style={text > 0 ? { color: "#1677ff" } : { color: "red" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "Unit",
    },
  ];
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const actions = useAction();
  const loading = useSelector((state: any) => state.state.loadingState);
  const selectedPage = useSelector(
    (state: any) => state.importgoods.selectedPageHistory
  );
  const historyWarehouse = useSelector(
    (state: any) => state.importgoods.historyWarehouse
  );
  const time = useSelector(
    (state: any) => state.importgoods.selectedTimeHistory
  );
  if (historyWarehouse?.Data) {
    if (Array.isArray(historyWarehouse.Data)) {
      let i = 0;
      data = historyWarehouse?.Data?.map((his: any) => {
        i++;
        return {
          key: his.Id ? `${his.Id} ${i + 1}` : "",
          CreatedAt: his.CreatedAt ? his.CreatedAt : "",
          NameMaterial: his.NameMaterial ? his.NameMaterial : "",
          Amount: his.Amount ? his.Amount : "",
          Unit: his.Unit ? his.Unit : "",
        };
      });
    }
  }

  useEffect(() => {
    dispatch(actions.ImportGoodsActions.loadHistoryWarehouse());
  }, [dispatch, actions.ImportGoodsActions, selectedPage]);
  const handleValueChange = () => {
    console.log(form.getFieldsValue().time);
    if (Array.isArray(form.getFieldsValue().time)) {
      const dateTime = form.getFieldsValue().time.map((datetime: any) => {
        const myDate = dayjs(datetime).format("DD/MM/YYYY HH:mm:ss");
        return myDate;
      });
      dispatch(actions.ImportGoodsActions.setTimeHistory(dateTime));
    }
    if (!form.getFieldsValue().time) {
      dispatch(actions.ImportGoodsActions.setTimeHistory(null));
    }
  };
  const handleClickSearch = () => {
    dispatch(actions.ImportGoodsActions.setPageHistory(1));
    dispatch(actions.ImportGoodsActions.loadHistoryWarehouse());
    //dispatch(actions.ImportGoodsActions.setTimeHistory([]));
  };
  return (
    <div className="history-warehouse-page">
      <Row gutter={[0, 25]}>
        <Col span={16}>
          <div className="title-button-history-warehouse-page">
            <div className="title-history-warehouse-page">Lịch sử kho</div>
          </div>
        </Col>
        <Col span={8}>
          <Space.Compact>
            <Button onClick={handleClickSearch}>Lọc</Button>
            <Form form={form} onValuesChange={handleValueChange}>
              <Form.Item
                initialValue={
                  Array.isArray(time)
                    ? [
                        dayjs(time[0], "DD/MM/YYYY HH:mm:ss"),
                        dayjs(time[1], "DD/MM/YYYY HH:mm:ss"),
                      ]
                    : null
                }
                name="time"
              >
                <DatePicker.RangePicker showTime />
              </Form.Item>
            </Form>
          </Space.Compact>
        </Col>
        <Col span={24}>
          <div
            style={{
              border: "0.5px solid black",
              opacity: "0.05",
            }}
          ></div>
        </Col>
        <Col span={24}>
          <div className="container-history-warehouse-page">
            <div className="content-import-warehouse-page">
              <Table
                loading={loading}
                style={{ marginLeft: "20px" }}
                columns={columns}
                dataSource={data}
                pagination={{
                  defaultCurrent: selectedPage,
                  pageSize: 6,
                  total: historyWarehouse?.TotalPage,

                  onChange: (page) => {
                    dispatch(actions.ImportGoodsActions.setPageHistory(page));
                  },
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default HistoryWarehouse;
