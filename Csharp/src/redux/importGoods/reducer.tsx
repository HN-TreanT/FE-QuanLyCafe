import actions from "./actions";

interface MaterialState {
  importGoods: any[];
  page: Number;
  selectedPageHistory: Number;
  materialSelected: any[];
  infoProvider: {
    NameProvider: string;
    PhoneProvider: Number;
  };
}
const initAuth: MaterialState = {
  importGoods: [],
  page: 1,
  selectedPageHistory: 1,
  materialSelected: [],
  infoProvider: {
    NameProvider: "",
    PhoneProvider: 0,
  },
};
const ImportGoodReducer = (state: MaterialState = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCES:
      return {
        ...state,
        ...{
          importGoods: action.payload.data,
        },
      };
    case actions.types.SELECTED_PAGE:
      return {
        ...state,
        ...{
          page: action.payload.data,
        },
      };
    case actions.types.LOAD_HISTORY_WAREHOUSE:
      return {
        ...state,
      };
    case actions.types.LOAD_HISTORY_WAREHOUSE_SUCCESS:
      return {
        ...state,
        ...{
          historyWarehouse: action.payload.data,
        },
      };
    case actions.types.SELECTED_PAGE_HISTORY:
      return {
        ...state,
        ...{
          selectedPageHistory: action.payload.data,
        },
      };
    case actions.types.SELECTED_TIME_HISTORY:
      return {
        ...state,
        ...{
          selectedTimeHistory: action.payload.data,
        },
      };
    case actions.types.MATERIAL_SELECTED_IMPORTS:
      return {
        ...state,
        ...{
          materialSelected: action.payload.data,
        },
      };
    case actions.types.CREATE_IMPORT_GOODS:
      return {
        ...state,
      };
    case actions.types.INFO_PROVIDER:
      return {
        ...state,
        ...{
          infoProvider: action.payload.data,
        },
      };
    case actions.types.SEARCH_VALUE:
      return {
        ...state,
        ...{
          searchValue: action.payload.data,
        },
      };
    case actions.types.GET_IMPORTSGOODS_BY_ID:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default ImportGoodReducer;
