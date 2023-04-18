const types = {
  LOAD_DATA: "/category/load-data",
  LOAD_DATA_SUCCES: "/category/load-data-success",
  CATEGORY_SELECTED: "/category/category-selected",
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
  categorySelected: (category: any) => {
    return {
      type: types.CATEGORY_SELECTED,
      payload: { category },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const CategoryActions = action;
