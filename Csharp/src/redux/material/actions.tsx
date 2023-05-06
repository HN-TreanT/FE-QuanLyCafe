const types = {
  LOAD_DATA: "/material/load-data",
  LOAD_DATA_SUCCES: "/material/load-data-success",
  SELECTED_MATERIAL: "/material/selected-material",
  INFO_USE_MATERIAL: "/material/info-amount-material",
  SELECTED_PAGE: "/material/selected-page",
  SEARCH_VALUE: "/material/search-value",
};
const action = {
  selectedMaterial: (data: any) => {
    return {
      type: types.SELECTED_MATERIAL,
      payload: { data },
    };
  },
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (materials: any) => {
    return {
      type: types.LOAD_DATA_SUCCES,
      payload: { materials },
    };
  },
  infoUseMaterial: (data: any) => {
    return {
      type: types.INFO_USE_MATERIAL,
      payload: { data },
    };
  },
  setSelectedPage: (data: any) => {
    return {
      type: types.SELECTED_PAGE,
      payload: { data },
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
export const MaterialActions = action;
