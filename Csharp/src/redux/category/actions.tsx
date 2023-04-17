const types = {
  LOAD_DATA: "/category/load-data",
  LOAD_DATA_SUCCES: "/category/load-data-success",
};
const action = {
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (categories: any) => {
    return {
      type: types.LOAD_DATA_SUCCES,
      payload: { categories },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const CategoryActions = action;
