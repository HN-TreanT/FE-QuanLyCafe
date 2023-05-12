const types = {
  LOAD_PRODUCT: "/order-page/loadproduct",
  LOAD_PRODUCT_SUCCESS: "/order-page/loadproduct-success",
  SELECTED_PAGE_PRODUCT: "/order-page/selected-page-product",
  SELECTED_CATEGORY: "/order-page/selected-category",
  SEARCH_VALUE: "/order-page/search-value",
  SELECTED_PAGE_ORDERS: "order-page/selected-page-orders",
  SEARCH_VALUE_ORDER: "/order-page/search-value-orders",
  TYPE_SEARCH_ORDER: "/order-page/type-search-order",
  LOAD_ORDERS: "/order-page/load-orderpage",
  LOAD_ORDER_SUCCESS: "/order-page/load-success-orderpage",
  LOAD_TABLE: "/order-page/load-table",
  LOAD_TABLE_SUCCESS: "/order-page/load-table-success",
  STATE_TABLE: "/order-page/state-table",
  SELECTED_PAGE_TABLE: "/order-page/selected-page-table",
  SEARCH_VALUE_TABLE: "/order-page/search-value-table",
  SELECTED_TABLE_ON_SPLIT_ORDER: "/order-page/selected-table-on-split-order",
  RADIO_SELECT_SPLIT_GRAFT_ORDER: "order-page/radio-select-split-graft-order",
};
const action = {
  loadProduct: () => {
    return {
      type: types.LOAD_PRODUCT,
    };
  },
  loadProductSuccess: (data: any) => {
    return {
      type: types.LOAD_PRODUCT_SUCCESS,
      payload: { data },
    };
  },
  setSelectedPageProduct: (data: any) => {
    return {
      type: types.SELECTED_PAGE_PRODUCT,
      payload: { data },
    };
  },
  setSelectedCategory: (data: any) => {
    return {
      type: types.SELECTED_CATEGORY,
      payload: { data },
    };
  },
  setSearchValue: (data: any) => {
    return {
      type: types.SEARCH_VALUE,
      payload: { data },
    };
  },
  setSelectedPageOrders: (data: any) => {
    return {
      type: types.SELECTED_PAGE_ORDERS,
      payload: { data },
    };
  },
  setSearchValueOrder: (data: any) => {
    return {
      type: types.SEARCH_VALUE_ORDER,
      payload: { data },
    };
  },
  setTypeSearchValueOrder: (data: any) => {
    return {
      type: types.TYPE_SEARCH_ORDER,
      payload: { data },
    };
  },
  loadOrders: () => {
    return {
      type: types.LOAD_ORDERS,
    };
  },
  loadOrdersSuccess: (data: any) => {
    return {
      type: types.LOAD_ORDER_SUCCESS,
      payload: { data },
    };
  },
  setStateTable: (data: any) => {
    return {
      type: types.STATE_TABLE,
      payload: { data },
    };
  },
  loadTable: () => {
    return {
      type: types.LOAD_TABLE,
    };
  },
  loadTableSuccess: (data: any) => {
    return {
      type: types.LOAD_TABLE_SUCCESS,
      payload: { data },
    };
  },
  setSelectedPagetable: (data: any) => {
    return {
      type: types.SELECTED_PAGE_TABLE,
      payload: { data },
    };
  },
  setSearchValueTable: (data: any) => {
    return {
      type: types.SEARCH_VALUE_TABLE,
      payload: { data },
    };
  },
  setSelectedTableOnSplitOrder: (data: any) => {
    return {
      type: types.SELECTED_TABLE_ON_SPLIT_ORDER,
      payload: { data },
    };
  },
  setRadioSelectSplitGraftOrder: (data: any) => {
    return {
      type: types.RADIO_SELECT_SPLIT_GRAFT_ORDER,
      payload: { data },
    };
  },
};

const actions = {
  types,
  action,
};

export default actions;
export const OrderPageActions = action;
