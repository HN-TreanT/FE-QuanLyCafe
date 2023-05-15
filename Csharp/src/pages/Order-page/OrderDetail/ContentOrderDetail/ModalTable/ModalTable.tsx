import React from "react";
import { Row, Col, Pagination, Menu, Image, Form, Input, Modal } from "antd";
import tableImage0 from "../../../../../assets/dinning-table_0.png";
import "./ModalTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faMagnifyingGlass,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import useAction from "../../../../../redux/useActions";
import { useDispatch, useSelector } from "react-redux";
import Spinn from "../../../../../components/Spinning/Spinning";
import useDebounce from "../../../../../hooks/useDebounce";

const ModalTable: React.FC<any> = ({
  visible,
  setVisible,
  order,
  setOrder,
}) => {
  const actions = useAction();
  const dispatch = useDispatch();
  const selectedPage = useSelector(
    (state: any) => state.orderpage.selectedPageTable
  );
  const infoUpdateOrder = useSelector(
    (state: any) => state.orderpage.infoUpdateOrder
  );
  const stateTable = useSelector((state: any) => state.orderpage.stateTable);
  const tables = useSelector((state: any) => state.orderpage.tables);
  const loading = useSelector((state: any) => state.state.loadingState);
  const [searchValue, setSearchValue] = React.useState("");
  const searchValueDebounce = useDebounce<string>(searchValue, 500);
  React.useEffect(() => {
    dispatch(actions.OrderPageActions.setStateTable("emptyTable"));
    dispatch(actions.OrderPageActions.setSearchValueTable(searchValueDebounce));
    dispatch(actions.OrderPageActions.loadTable());
  }, [
    actions.OrderPageActions,
    dispatch,
    selectedPage,
    stateTable,
    searchValueDebounce,
  ]);

  const handlSearchTableFood = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPagetable(1));
    setSearchValue(e.target.value);
  };
  const handleChangePageTable = (e: any) => {
    dispatch(actions.OrderPageActions.setSelectedPagetable(e));
  };
  const handleClickItemTable = (tableFood: any) => {
    setOrder({ ...order, IdTableNavigation: tableFood });
    setVisible(false);
    dispatch(
      actions.OrderPageActions.setInfoUpdateOrder({
        ...infoUpdateOrder,
        IdTableNavigation: tableFood,
      })
    );
  };
  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      width={1000}
      footer={false}
    >
      <div className="table-modal">
        {loading ? <Spinn /> : ""}

        <Row gutter={[15, 0]}>
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
            <div className="content-table-modal">
              <div className="list-table">
                <Row gutter={[10, 30]}>
                  {Array.isArray(tables?.Data) && tables?.Data.length ? (
                    tables?.Data?.map((item: any) => {
                      return (
                        <Col
                          onClick={() => handleClickItemTable(item)}
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
              <div className="pagination-table-modal">
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
    </Modal>
  );
};
export default ModalTable;
