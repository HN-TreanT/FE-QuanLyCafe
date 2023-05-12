import React, { useEffect } from "react";
import { Input, Row, Col, Button, AutoComplete, Modal } from "antd";
import "./ContentOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faMagnifyingGlass,
  faPlusCircle,
  faUsers,
  faFileLines,
  faMoneyBill1Wave,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import ItemOrderDetail from "./ItemOrderDetail/ItemOrderDetail";
import useDebounce from "../../../../hooks/useDebounce";
import { customerServices } from "../../../../untils/networks/services/customerServices";
import ModalSplitOrder from "./ModalSplitOrder/ModalSplitOrder";
let data: any[] = [];
for (var i = 1; i < 20; i++) {
  data.push(i);
}
const getCustomers = async (searchValue: any) => {
  let data: any[] = [];
  const handleClickSelectCustomer = (value: any) => {
    //handle add customer to order
    console.log(value);
  };
  const renderItem = (key: string, value: any) => ({
    key: key,
    value: `${value?.Fullname}`,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={() => handleClickSelectCustomer(value)}
      >
        <span>{value?.Fullname}</span>
        <span>{value?.PhoneNumber}</span>
      </div>
    ),
  });
  let response = await customerServices.getAllCustomer(1, searchValue);
  if (Array.isArray(response?.Data) && response?.Data.length > 0) {
    data = response?.Data.map((item: any) => {
      return renderItem(item?.IdCustomer, item);
    });
  }
  return data;
};
const ContentOrderDetail: React.FC = () => {
  const [isOpenModalCountCustomer, setIsOpenModalCountModal] =
    React.useState(false);
  const [isOpenModalSplitOrder, setIsOpenModalSplitOrder] =
    React.useState(false);
  const [searchCutomerValue, setSearchCustomerValue] = React.useState("");
  const [options, setOptions] = React.useState<any[]>([]);
  const searchValueDebounce = useDebounce<string>(searchCutomerValue, 500);
  useEffect(() => {
    if (searchValueDebounce !== null && searchValueDebounce !== "") {
      getCustomers(searchValueDebounce).then((res: any) => {
        setOptions(res);
      });
    } else {
      setOptions([]);
    }
  }, [searchValueDebounce]);
  const handleSearchCustomer = (e: any) => {
    setSearchCustomerValue(e);
  };
  const handleClickIconCustomerOrder = () => {
    setIsOpenModalCountModal(true);
  };
  const handlClickIconSplitOrder = () => {
    setIsOpenModalSplitOrder(true);
  };
  return (
    <div className="content-order-detail">
      {/* Modal edit count customer */}
      <Modal
        title="Thêm số lượng khách hàng"
        open={isOpenModalCountCustomer}
        onCancel={() => setIsOpenModalCountModal(false)}
        footer={[
          <Button
            key="cancle"
            onClick={() => {
              setIsOpenModalCountModal(false);
              // formAddCustomer.resetFields();
            }}
          >
            Hủy
          </Button>,
          <Button
            //  disabled={isDisabled}
            key="submit"
            type="primary"
            // onClick={handleUpdateCustomer}
          >
            Lưu
          </Button>,
        ]}
      >
        <Input
          onKeyDown={(e) => {
            if (
              e.key === "-" ||
              e.key === "e" ||
              e.key === "+" ||
              e.key === "E"
            ) {
              e.preventDefault();
            }
          }}
          min={0}
          placeholder="Nhập số lượng khách hàng"
          type="number"
        ></Input>
      </Modal>
      {/* Modal split order */}
      <ModalSplitOrder
        visible={isOpenModalSplitOrder}
        setIsOpenModal={setIsOpenModalSplitOrder}
      />
      <div>
        <div className="top-content-order-detail">
          <Row gutter={[5, 0]}>
            <Col span={4}>
              {" "}
              <div className="select-table">
                <FontAwesomeIcon
                  style={{ paddingRight: "5px" }}
                  icon={faTable}
                />
                bàn 1
              </div>
            </Col>
            <Col span={12}>
              <AutoComplete
                popupClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={250}
                style={{ width: 250 }}
                options={options}
                onChange={handleSearchCustomer}
              >
                <Input
                  className="input-search-order-detail"
                  placeholder="Tìm khách hàng"
                  suffix={
                    <FontAwesomeIcon
                      className="icon-add-customer-order-detail"
                      icon={faPlusCircle}
                    />
                  }
                  prefix={
                    <FontAwesomeIcon
                      className="icon-search-order-detail"
                      icon={faMagnifyingGlass}
                    />
                  }
                />
              </AutoComplete>
              {/* <SearchCutomer /> */}
            </Col>
          </Row>
        </div>
        <div className="middle-content-order-detail">
          {data.map((item: any) => (
            <ItemOrderDetail key={item} />
          ))}
        </div>
        <div className="footer-content-order-detail">
          <div className="info-order-detail">
            <div className="info-order-detail-left">
              <div
                onClick={handleClickIconCustomerOrder}
                className="count-customer-order"
              >
                <FontAwesomeIcon
                  className="icon-customer-order"
                  icon={faUsers}
                />
                <span>0</span>
              </div>
              <div onClick={handlClickIconSplitOrder} className="control-table">
                <FontAwesomeIcon
                  className="icon-control-table"
                  icon={faFileLines}
                />
                <span className="title-controle-table">Tách ghép</span>
              </div>
            </div>
            <div className="total-price-order">
              <span className="title-total-price-order">Tổng tiền:</span>
              <span className="price-total">394838732đ</span>
            </div>
          </div>
          <div className="button-control-order-detail">
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <Row gutter={[20, 10]}>
                <Col span={6}>
                  <Button danger className="button-controler-order">
                    <span className="title-button">Hủy</span>
                  </Button>
                </Col>
                <Col span={9}>
                  <Button type="primary" className="button-controler-order">
                    <FontAwesomeIcon
                      className="icon-button"
                      icon={faFloppyDisk}
                    />
                    <span className="title-button">Lưu</span>
                  </Button>
                </Col>
                <Col span={9}>
                  <Button
                    style={{ color: "white", backgroundColor: "#28B44F" }}
                    className="button-controler-order"
                  >
                    <FontAwesomeIcon
                      className="icon-button"
                      icon={faMoneyBill1Wave}
                    />
                    <span className="title-button">Thanh toán</span>
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentOrderDetail;
