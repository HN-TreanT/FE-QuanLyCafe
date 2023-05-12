import React, { useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { tableFoodService } from "../../../../../../untils/networks/services/tableFoodService";
import { useSelector, useDispatch } from "react-redux";
import useAction from "../../../../../../redux/useActions";

const getTables = async (searchValue: any) => {
  try {
    const tables = await tableFoodService.getAllTableFood(
      1,
      "allTable",
      searchValue
    );
    if (Array.isArray(tables?.Data) && tables?.Data.length > 0) {
      const data = tables?.Data.map((table: any) => ({
        value: table?.IdTable,
        label: `Bàn ${table?.Name} - ${table?.Status ? "Có người" : "Trống"}`,
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
  const fake = () => getTables(value).then((res: any) => callback(res));
  if (value) {
    timeout = setTimeout(fake, 300);
  } else {
    callback([]);
  }
};

const SearchTable: React.FC = () => {
  const dispatch = useDispatch();
  const actions = useAction();
  const [data, setData] = useState<SelectProps["options"]>([]);
  // const [value, setValue] = useState<string>();
  const selectedTable = useSelector(
    (state: any) => state.orderpage.selectedTableOnSplitOrder
  );
  const handleSearch = (newValue: string) => {
    fetch(newValue, setData);
  };

  const handleSelect = (value: string, options: any) => {
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
