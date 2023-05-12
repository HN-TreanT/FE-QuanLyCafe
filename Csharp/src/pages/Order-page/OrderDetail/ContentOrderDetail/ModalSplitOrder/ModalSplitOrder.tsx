import React from "react";
import { Button, Col, Modal, Row, Radio, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import "./ModalSplitOrder.scss";
import useDebounce from "../../../../../hooks/useDebounce";
import { tableFoodService } from "../../../../../untils/networks/services/tableFoodService";
const getTables = async (searchValue: any) => {
  let data: any[] = [];
  const tables = await tableFoodService.getAllTableFood(
    1,
    "allTable",
    searchValue
  );
  if (Array.isArray(tables?.Data) && tables?.Data.length > 0) {
    tables?.Data.map((table: any) => {
      return {
        key: table?.IdTable,
        value: table?.IdTable,
        label: `Bàn ${table?.Name}`,
      };
    });
  }
  return data;
};
const ModalSplitOrder: React.FC<any> = ({ visible, setIsOpenModal }) => {
  const [value, setValue] = React.useState();
  const [valueSearchTable, setValueSearchTable] = React.useState<string>("");
  const [options, setOptions] = React.useState<any[]>([]);
  const searchValueDebounce = useDebounce<string>(valueSearchTable, 500);
  React.useEffect(() => {
    if (searchValueDebounce !== null && searchValueDebounce !== "") {
      getTables(searchValueDebounce).then((res: any) => {
        setOptions(res);
      });
    } else {
      setOptions([]);
    }
  }, [searchValueDebounce]);
  const onChangeRadio = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const onChangeSearchTable = (e: any) => {
    setValueSearchTable(e);
  };
  return (
    <Modal
      title="Tách ghép hóa đơn"
      width={700}
      onCancel={() => setIsOpenModal(false)}
      footer={[
        <Button
          //  disabled={isDisabled}
          key="submit"
          type="primary"
          // onClick={handleUpdateCustomer}
        >
          <FontAwesomeIcon
            style={{ paddingRight: "5px" }}
            icon={faSquareCheck}
          />
          <span> Thực hiện</span>
        </Button>,
        <Button
          key="cancle"
          onClick={() => {
            setIsOpenModal(false);
            // formAddCustomer.resetFields();
          }}
        >
          <FontAwesomeIcon style={{ paddingRight: "5px" }} icon={faBan} />
          <span> Bỏ qua</span>
        </Button>,
      ]}
      open={visible}
    >
      <div className="modal-split-order">
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Radio.Group
              onChange={onChangeRadio}
              value={value ? value : "graft"}
            >
              <Radio value={"graft"}>Ghép đơn</Radio>
              <Radio value={"split"}>Tách đơn</Radio>
            </Radio.Group>
          </Col>
          <Col span={24}>
            <span style={{ paddingRight: "10px", fontWeight: "500" }}>
              Tách đến
            </span>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Nhập tên bàn"
              optionFilterProp="children"
              onSearch={onChangeSearchTable}
              options={[
                {
                  value: "1",
                  label: "Not Identified",
                },
                {
                  value: "2",
                  label: "Closed",
                },
                {
                  value: "3",
                  label: "Communicated",
                },
                {
                  value: "4",
                  label: "Identified",
                },
                {
                  value: "5",
                  label: "Resolved",
                },
                {
                  value: "6",
                  label: "Cancelled",
                },
              ]}
            />
          </Col>
          <Col span={24}></Col>
        </Row>
      </div>
    </Modal>
  );
};
export default ModalSplitOrder;
