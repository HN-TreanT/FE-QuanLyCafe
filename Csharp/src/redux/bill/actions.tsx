const types = {
  LOAD_DATA: "/bil/load-data",
  LOAD_DATA_SUCCESS: "/bill/bill-data",
  SELECTED_STATE_BILL: "/bill/selected-state-bill",
  DELETE_BILL: "bill/delete-bill",
  SELECTED_ROW_KEYS: "bill/selected-row-keys",
  SELECTED_PAGE: "bill/selected-page",
  SEARCH_VALUE: "bill/search-value",
  TYPE_SEARCH: "bill/type-search",
};
const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (billData: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { billData },
    };
  },
  selectedStateBill: (selected: any) => {
    return {
      type: types.SELECTED_STATE_BILL,
      payload: { selected },
    };
  },
  deleteBill: () => {
    return {
      type: types.DELETE_BILL,
    };
  },
  selectedRowKeys: (selectedRowKeys: any) => {
    return {
      type: types.SELECTED_ROW_KEYS,
      payload: { selectedRowKeys },
    };
  },
  selectedPage: (data: any) => {
    return {
      type: types.SELECTED_PAGE,
      payload: { data },
    };
  },
  setSearchValue: (data: string) => {
    return {
      type: types.SEARCH_VALUE,
      payload: { data },
    };
  },
  setTypeSearch: (data: any) => {
    return {
      type: types.TYPE_SEARCH,
      payload: { data },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const BillActions = action;
