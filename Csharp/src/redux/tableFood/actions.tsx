const types = {
  LOAD_DATA: "/tableFood/load-data",
  LOAD_DATA_SUCCESS: "/tableFood/load-data-sucess",
  PAGE: "/tableFood/page",
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
  setPage: (data: any) => {
    return {
      type: types.PAGE,
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
