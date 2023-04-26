const types = {
  LOAD_DATA: "/tableFood/load-data",
  LOAD_DATA_SUCCESS: "/tableFood/load-data-sucess",
  TABLE_SELECTED: "/tablefood/table-selected",
};

const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (data: any) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { data },
    };
  },
  tableSelected: (data: any) => {
    return {
      type: types.TABLE_SELECTED,
      payload: { data },
    };
  },
};
const actions = {
  types,
  action,
};
export default actions;
export const TableFoodActions = action;
