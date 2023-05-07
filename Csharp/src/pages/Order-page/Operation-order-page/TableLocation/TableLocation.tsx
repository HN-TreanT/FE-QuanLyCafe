import React from "react";
import {
  Row,
  Col,
  Pagination,
  Menu,
  MenuProps,
  Image,
  Form,
  Input,
} from "antd";
import tableImage1 from "../../../../assets/dinning-table_0.png";
import "./TableLocation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const items: MenuProps["items"] = [
  {
    label: "Tất cả bàn ăn",
    key: "allTable",
  },
  {
    label: "Bàn trống",
    key: "emptyTable",
  },
  {
    label: "Bàn đang hoạt động",
    key: "activeTable",
  },
];

let data: any[] = [];
for (var i = 0; i < 18; i++) {
  data.push(i);
}

const TableLocation: React.FC = () => {
  return (
    <div className="table-location">
      <Row gutter={[15, 0]}>
        <Col span={24}>
          <Menu
            className="nav-bill-page"
            // onClick={handleSeletected}
            //selectedKeys={["allTable"]}
            mode="horizontal"
            items={items}
          />
        </Col>
        <Col span={24}>
          <div className="search-table">
            <Form style={{ marginTop: "15px" }}>
              <Row gutter={[30, 0]}>
                <Col span={10}>
                  <Form.Item
                    name="time"
                    className="input-search-import-warehouse input-label-inline-border"
                  >
                    <label className="ant-form-item-label" htmlFor="">
                      Nhập tên bàn ăn
                    </label>
                    <Input
                      // onChange={handlSearchTableFood}
                      bordered={false}
                      placeholder="Nhập tên bàn ăn"
                      prefix={
                        <FontAwesomeIcon
                          icon={faMagnifyingGlass}
                          className="icon-search"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={10}></Col>
                <Col span={4}>
                  <div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{
                          paddingRight: "7px",
                          color: "#7facfa",
                        }}
                      />
                      <span style={{ color: "#7facfa" }}>Đang có người</span>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faCircle}
                        style={{
                          paddingRight: "7px",
                          color: "rgb(141, 139, 139)",
                        }}
                      />
                      <span>Không có người</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col span={24}>
          <div className="content-table-location">
            <div className="list-table">
              <Row gutter={[10, 30]}>
                {data.map((item: any) => {
                  return (
                    <Col
                      // onClick={() => handleClickItemTable(tableFood)}
                      //key={tableFood?.IdTable}
                      span={4}
                      key={item}
                    >
                      <div className="item-table">
                        <Image
                          src={tableImage1}
                          preview={false}
                          style={{
                            width: "90px",
                            height: "70px",
                          }}
                        />
                        <div>{`Bàn 1`}</div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="pagination-table-location">
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default TableLocation;
