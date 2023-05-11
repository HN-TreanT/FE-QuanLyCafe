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
import tableImage0 from "../../../../assets/dinning-table_0.png";
import tableImage1 from "../../../../assets/dinning-table-1.png";
import "./TableLocation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faMagnifyingGlass,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import useAction from "../../../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
import Spinn from "../../../../components/Spinning/Spinning";
import useDebounce from "../../../../hooks/useDebounce";

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
  const actions = useAction();
  const dispatch = useDispatch();
  const selectedPage = useSelector(
    (state: any) => state.orderpage.selectedPageTable
  );
  const stateTable = useSelector((state: any) => state.orderpage.stateTable);
  const tables = useSelector((state: any) => state.orderpage.tables);
  const loading = useSelector((state: any) => state.state.loadingState);
  const [searchValue, setSearchValue] = React.useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  React.useEffect(() => {
    dispatch(actions.OrderPageActions.setSearchValueTable(searchValueDebounce));
    dispatch(actions.OrderPageActions.loadTable());
  }, [
    actions.OrderPageActions,
    dispatch,
    selectedPage,
    stateTable,
    searchValueDebounce,
  ]);

  const handleSelectedStateTable = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPagetable(1));
    dispatch(actions.OrderPageActions.setStateTable(e.key));
  };
  const handlSearchTableFood = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPagetable(1));
    setSearchValue(e.target.value);
  };
  const handleChangePageTable = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPagetable(e));
  };
  return (
    <div className="table-location">
      {loading ? <Spinn /> : ""}
      <Row gutter={[15, 0]}>
        <Col span={24}>
          <Menu
            className="nav-bill-page"
            onClick={handleSelectedStateTable}
            selectedKeys={[stateTable ? stateTable : "allTable"]}
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
                      Nhập số bàn ăn
                    </label>
                    <Input
                      type="number"
                      onChange={handlSearchTableFood}
                      bordered={false}
                      placeholder="Nhập số bàn ăn"
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
                {Array.isArray(tables?.Data) && tables?.Data.length ? (
                  tables?.Data?.map((item: any) => {
                    if (item?.Status === 0) {
                      return (
                        <Col
                          // onClick={() => handleClickItemTable(tableFood)}
                          //key={tableFood?.IdTable}
                          span={4}
                          key={item?.IdTable}
                        >
                          <div className="item-table">
                            <Image
                              src={tableImage0}
                              preview={false}
                              style={{
                                width: "90px",
                                height: "70px",
                              }}
                            />
                            <div>{`${item?.Name}`}</div>
                          </div>
                        </Col>
                      );
                    } else {
                      return (
                        <Col
                          // onClick={() => handleClickItemTable(tableFood)}
                          //key={tableFood?.IdTable}
                          span={4}
                          key={item?.IdTable}
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
                            <div>{`Bàn ${item?.Name}`}</div>
                          </div>
                        </Col>
                      );
                    }
                  })
                ) : (
                  <div className="empty-table">
                    <FontAwesomeIcon
                      icon={faTable}
                      style={{
                        fontSize: "5rem",
                        color: "rgba(0, 0, 0, 0.407)",
                      }}
                    />
                    <div style={{ color: "rgba(0, 0, 0, 0.600)" }}>
                      không có bàn nào
                    </div>
                  </div>
                )}
              </Row>
            </div>
            <div className="pagination-table-location">
              <Pagination
                onChange={handleChangePageTable}
                defaultCurrent={selectedPage ? selectedPage : 1}
                total={tables.TotalPage ? tables.TotalPage : 1}
                pageSize={18}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default TableLocation;
