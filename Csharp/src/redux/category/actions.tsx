const types = {
  LOAD_DATA: "/category/load-data",
  LOAD_DATA_SUCCES: "/category/load-data-success",
  CATEGORY_SELECTED: "/category/category-selected",
  SELECTED_ROW: "/category/selected-row",
  LOAD_CATEGORY_DETAIL: "/category/category-detail",
  LOAD_CATEGORY_DETAIL_SUCCESS: "/category/category-detail-success",
  // REDIRECT_DETAIL_PAGE: "/category/redirect-detail-page",
  // REDIRECT_ACTION: "category/redirect-action",
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
  setSelectedRow: (data: any) => {
    return {
      type: types.SELECTED_ROW,
      payload: { data },
    };
  },
  loadCategoryDetail: () => {
    return {
      type: types.LOAD_CATEGORY_DETAIL,
    };
  },
  loadCategorySuccess: (data: any) => {
    return {
      type: types.LOAD_CATEGORY_DETAIL_SUCCESS,
      payload: { data },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const CategoryActions = action;
