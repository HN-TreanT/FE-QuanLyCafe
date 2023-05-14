import React, { useState } from "react";
import { Select, Space, Tooltip } from "antd";
import type { SelectProps } from "antd";
import { customerServices } from "../../../../untils/networks/services/customerServices";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const getCustomer = async (searchValue: any) => {
  try {
    const customer = await customerServices.getAllCustomer(1, searchValue);
    if (Array.isArray(customer?.Data) && customer?.Data.length > 0) {
      const data = customer?.Data.map((Customer: any) => ({
        value: Customer?.IdCustomer,
        label: `${Customer?.Fullname} - ${Customer?.PhoneNumber}`,
      }));
      return data;
    }
  } catch (error) {
    return [];
  }
};
let timeout: ReturnType<typeof setTimeout> | null;

const fetch = (value: string, callback: Function) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  const fake = () => getCustomer(value).then((res: any) => callback(res));
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const SearchCustomer: React.FC = () => {
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>(
    selectedOrder?.IdCustomerNavigation?.Fullname
  );

  React.useEffect(() => {
    setValue(selectedOrder?.IdCustomerNavigation?.Fullname);
  }, [selectedOrder]);

  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleSelect = (value: string, options: any) => {
    setValue(value);
  };

  return (
    <Space>
      <Select
        showSearch
        value={value}
        placeholder="Tìm kiếm khách hàng"
        style={{ width: 300 }}
        filterOption={false}
        onSearch={handleSearch}
        onSelect={handleSelect}
        notFoundContent={"No found data"}
        options={(data || []).map((Customer) => ({
          value: Customer?.value,
          label: Customer.label,
        }))}
      ></Select>
      <Tooltip placement="top" title="Thêm khách hàng">
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="icon-add-customer-order-detail"
        />
      </Tooltip>
    </Space>
  );
};

export default SearchCustomer;
