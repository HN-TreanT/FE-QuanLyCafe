const types = {
  LOAD_DATA: "/customer/load-data",
  LOAD_DATA_SUCCES: "/customer/load-data-success",
  SELECTED_PAGE: "/customer/selected-page",
  SEARCH_VALUE: "/customer/search-value",
};
const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (customers: any) => {
    return {
      type: types.LOAD_DATA_SUCCES,
      payload: { customers },
    };
  },
  setSelectedPage: (selectedPage: any) => {
    return {
      type: types.SELECTED_PAGE,
      payload: { selectedPage },
    };
  },
  setSearchValue: (data: any) => {
    return {
      type: types.SEARCH_VALUE,
      payload: { data },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const CustomerActions = action;
