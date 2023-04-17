import actions from "./actions";

interface MaterialState {
  materials: any[];
  infoUseMaterials: any[];
  selectedMaterials: any[];
}
const initAuth: MaterialState = {
  materials: [],
  infoUseMaterials: [],
  selectedMaterials: [],
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
    default:
      return state;
  }
};
export default MaterialReducer;
