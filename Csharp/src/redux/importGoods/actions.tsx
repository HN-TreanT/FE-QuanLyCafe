const types = {
  LOAD_DATA: "/importGoods/load-data",
  LOAD_DATA_SUCCES: "/importGoods/load-data-success",
  SELECTED_PAGE: "importGoods/selected-page",
  LOAD_HISTORY_WAREHOUSE: "importGoods/load-historywarehouse",
  LOAD_HISTORY_WAREHOUSE_SUCCESS: "importGoods/load-historywarehouse-success",
  SELECTED_PAGE_HISTORY: "importGoods/selected-page-history",
  SELECTED_TIME_HISTORY: "importGoods/selected-time-history",
  MATERIAL_SELECTED_IMPORTS: "importGoods/material-selected-imports",
  CREATE_IMPORT_GOODS: "importGoods/create-import-goods",
  INFO_PROVIDER: "importGoods/info-provider",
};
const action = {
  loadHistoryWarehouse: () => {
    return {
      type: types.LOAD_HISTORY_WAREHOUSE,
    };
  },
  loadHistoryWarehouseSuccess: (data: any) => {
    return {
      type: types.LOAD_HISTORY_WAREHOUSE_SUCCESS,
      payload: { data },
    };
  },
  loadData: () => {
    return {
      type: types.LOAD_DATA,
    };
  },
  loadDataSuccess: (data: any) => {
    return {
      type: types.LOAD_DATA_SUCCES,
      payload: { data },
    };
  },
  setPage: (data: Number) => {
    return {
      type: types.SELECTED_PAGE,
      payload: { data },
    };
  },
  setPageHistory: (data: Number) => {
    return {
      type: types.SELECTED_PAGE_HISTORY,
      payload: { data },
    };
  },
  setTimeHistory: (data: any) => {
    return {
      type: types.SELECTED_TIME_HISTORY,
      payload: { data },
    };
  },
  setMaterialSelectedImports: (data: any) => {
    return {
      type: types.MATERIAL_SELECTED_IMPORTS,
      payload: { data },
    };
  },
  createImportGoods: () => {
    return {
      type: types.CREATE_IMPORT_GOODS,
    };
  },
  setInfoProvider: (data: any) => {
    return {
      type: types.INFO_PROVIDER,
      payload: { data },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const ImportGoodsActions = action;
