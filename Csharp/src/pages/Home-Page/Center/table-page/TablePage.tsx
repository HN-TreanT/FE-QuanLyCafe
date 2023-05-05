import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Row,
  Button,
  Form,
  Image,
  Modal,
  InputNumber,
  Pagination,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircle } from "@fortawesome/free-solid-svg-icons";
import useAction from "../../../../redux/useActions";
import TableStatus1 from "../../../../assets/dinning-table-1.png";
import TableStatus0 from "../../../../assets/dinning-table.png";
import "./TablePage.scss";
import { notification } from "../../../../components/notification";
import { tableFoodService } from "../../../../untils/networks/services/tableFoodService";
import Spinn from "../../../../components/Spinning/Spinning";
import ModalEditTable from "../../../../components/ModalEditTable/ModalEditTable";

interface TableDto {
  Name: string;
  Status: Number;
}
const TablePage: React.FC = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const actions = useAction();
  const tableFoods = useSelector((state: any) => state.tablefood.tableFoods);
  const loading = useSelector((state: any) => state.state.loadingState);
  const page = useSelector((state: any) => state.tablefood.page);
  const [disabled, setDisabled] = useState(true);
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [tableSelect, setTableSelected] = useState<TableDto>();

  useEffect(() => {
    dispatch(actions.TableFoodActions.loadData());
  }, [dispatch, actions.TableFoodActions, isOpenModalEdit]);
  const handleClickButtonAddTable = () => {
    setIsOpenModalCreate(true);
  };
  const hadleCreateTable = async () => {
    setIsOpenModalCreate(false);
    try {
      dispatch(actions.StateAction.loadingState(true));
      let response = await tableFoodService.createTableFood(
        form.getFieldsValue()
      );
      if (response.Status) {
        dispatch(actions.TableFoodActions.loadData());
        dispatch(actions.StateAction.loadingState(false));
        notification({
          message: "create success",
          title: "Thông báo",
          position: "top-right",
          type: "success",
        });
      } else {
        notification({
          message: response.Message,
          title: "Thông báo",
          position: "top-right",
          type: "danger",
        });
        dispatch(actions.StateAction.loadingState(false));
      }
    } catch (err: any) {
      notification({
        message: "error server",
        title: "Thông báo",
        position: "top-right",
        type: "danger",
      });
      dispatch(actions.StateAction.loadingState(false));
    }
    form.resetFields();
  };
  const handleClickItemTable = async (data: any) => {
    console.log("check click", data);
    setTableSelected(data);
    setIsOpenModalEdit(true);
  };
  const handleChangePage = (e: any) => {
    console.log(e);
    dispatch(actions.TableFoodActions.setPage(e));
    dispatch(actions.TableFoodActions.loadData());
  };
  return (
    <div className="table-page">
      {loading ? <Spinn /> : ""}
      {/* Modal create table */}
      <Modal
        title="Thêm bàn ăn"
        open={isOpenModalCreate}
        onCancel={() => {
          form.resetFields();
          setIsOpenModalCreate(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              form.resetFields();
              setIsOpenModalCreate(false);
            }}
          >
            Hủy
          </Button>,
          <Button
            disabled={disabled}
            key="submit"
            type="primary"
            onClick={hadleCreateTable}
          >
            Thêm
          </Button>,
        ]}
      >
        <Form
          layout="horizontal"
          form={form}
          onValuesChange={() => {
            if (
              form.getFieldsValue()?.Name &&
              form.getFieldsValue()?.Name !== ""
            ) {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }}
        >
          <Form.Item label="Số bàn" name="Name">
            <InputNumber style={{ width: "100%" }}></InputNumber>
          </Form.Item>
        </Form>
      </Modal>
      <ModalEditTable isOpen={isOpenModalEdit} data={tableSelect} />

      <Row gutter={[15, 15]}>
        <Col span={21}>
          <div className="title-table-page">Bàn ăn</div>
        </Col>
        <Col span={3}>
          <Button onClick={handleClickButtonAddTable} type="primary">
            <FontAwesomeIcon icon={faPlus} style={{ paddingRight: "5px" }} />
            <span>Thêm bàn</span>
          </Button>
        </Col>
        <Col span={24}>
          <div className="container-table-page">
            <div className="content-table-page">
              <Row gutter={[20, 25]}>
                <Col span={24}>
                  <div className="header-content-table-page">
                    <div className="title-content-table-page">
                      <span>Danh sách các bàn ăn </span>
                    </div>
                    <div className="note-content-table-page">
                      <div style={{ paddingRight: "10px", fontWeight: "500" }}>
                        <span>Chú thích :</span>
                      </div>
                      <div>
                        <div>
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{
                              paddingRight: "7px",
                              color: "#7facfa",
                            }}
                          />
                          <span style={{ color: "#7facfa" }}>
                            Đang có người
                          </span>
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
                    </div>
                  </div>
                </Col>

                <Col span={24}>
                  <div
                    style={{
                      border: "0.5px solid black",
                      opacity: "0.05",
                    }}
                  ></div>
                </Col>
                {Array.isArray(tableFoods.Data) ? (
                  tableFoods?.Data?.map((tableFood: any) => {
                    if (tableFood?.Status === 1) {
                      return (
                        <Col
                          onClick={() => handleClickItemTable(tableFood)}
                          key={tableFood?.IdTable}
                          span={4}
                        >
                          <div
                            className="item-table"
                            style={{
                              color: " #7facfa",
                              boxShadow: " 1px 1px 5px #7c7a783a",
                            }}
                          >
                            <Image
                              src={TableStatus1}
                              preview={false}
                              style={{ width: "120px", height: "90px" }}
                            />
                            <div>{`Bàn ${tableFood?.Name}`}</div>
                          </div>
                        </Col>
                      );
                    } else {
                      return (
                        <Col
                          onClick={() => handleClickItemTable(tableFood)}
                          key={tableFood.IdTable}
                          span={4}
                        >
                          <div
                            className="item-table"
                            style={{
                              color: " rgba(0, 0, 0, 0.508)",
                              boxShadow: " 1px 1px 5px #7c7a783a",
                            }}
                          >
                            <Image
                              src={TableStatus0}
                              preview={false}
                              style={{ width: "120px", height: "90px" }}
                            />
                            <div>{`Bàn ${tableFood?.Name}`}</div>
                          </div>
                        </Col>
                      );
                    }
                  })
                ) : (
                  <Col span={24}>
                    <div style={{ width: "100%" }}>
                      <span>Not found</span>
                    </div>
                  </Col>
                )}
                <Col span={17}></Col>
                <Col span={7}>
                  <Pagination
                    onChange={handleChangePage}
                    defaultCurrent={page}
                    total={Math.ceil(tableFoods?.TotalPage / 18) * 10}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default TablePage;
