import actions from "./actions";

interface MaterialState {
  materials: any[];
  infoUseMaterials: any[];
  selectedMaterials: any[];
  selectedPage: Number;
  searchValue: string;
}
const initAuth: MaterialState = {
  materials: [],
  infoUseMaterials: [],
  selectedMaterials: [],
  selectedPage: 1,
  searchValue: "",
};
const MaterialReducer = (state: MaterialState = initAuth, action: any) => {
  switch (action.type) {
    case actions.types.LOAD_DATA:
      return {
        ...state,
      };
    case actions.types.LOAD_DATA_SUCCES:
      return {
        ...state,
        ...{
          materials: action.payload.materials,
        },
      };
    case actions.types.SELECTED_MATERIAL:
      return {
        ...state,
        ...{
          selectedMaterials: action.payload.data,
        },
      };
    case actions.types.INFO_USE_MATERIAL:
      return {
        ...state,
        ...{
          infoUseMaterials: action.payload.data,
        },
      };
    case actions.types.SELECTED_PAGE:
      return {
        ...state,
        ...{
          selectedPage: action.payload.data,
        },
      };
    case actions.types.SEARCH_VALUE:
      return {
        ...state,
        ...{
          searchValue: action.payload.data,
        },
      };
    default:
      return state;
  }
};
export default MaterialReducer;
