import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../../../../../redux/useActions";
import moment from "moment";
import { billServices } from "../../../../../../untils/networks/services/billService";

const SearchTable: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [data, setData] = useState<SelectProps["options"]>([]);
  const selectedOrder = useSelector(
    (state: any) => state.orderpage.selectedOrder
  );
  const getTables = async (searchValue: any) => {
    try {
      const timeEnd = moment()
        .add(5, "minutes")
        .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");

      const timeStart = moment()
        .subtract(1, "day")
        .format("ddd, DD MMM YYYY HH:mm:ss [GMT]");
      ///api
      let response = await billServices.getAllOrder(
        "tableFood",
        searchValue,
        "getOrderUnpaid",
        1,
        timeStart,
        timeEnd
      );
      if (
        Array.isArray(response?.Data) &&
        response?.Data.length > 0 &&
        response?.Data[0].IdOrder !== selectedOrder?.IdOrder
      ) {
        const data = response?.Data.map((table: any) => {
          return {
            value: table?.IdOrder,
            label: `Bàn ${table?.NameTable}`,
          };
        });
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
    const fake = () => getTables(value).then((res: any) => callback(res));
    if (value) {
      timeout = setTimeout(fake, 300);
    } else {
      callback([]);
    }
  };
  // const [value, setValue] = useState<string>();
  const selectedTable = useSelector(
    (state: any) => state.orderpage.selectedTableOnSplitOrder
  );
  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleSelect = (value: string, options: any) => {
    console.log(options);
    dispatch(actions.OrderPageActions.setSelectedTableOnSplitOrder(options));
  };

  return (
    <Select
      showSearch
      value={selectedTable}
      placeholder="Tìm kiếm bàn ăn"
      style={{ width: 200 }}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onSelect={handleSelect}
      notFoundContent={"No found data"}
      options={(data || []).map((table) => ({
        value: table?.value,
        label: table.label,
      }))}
    />
  );
};

export default SearchTable;
