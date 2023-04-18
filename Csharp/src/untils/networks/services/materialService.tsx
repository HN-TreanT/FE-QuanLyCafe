import createApiServices from "../createApiService";
const api = createApiServices();
const getAllMaterial = () => {
  return api.makeAuthRequest({
    url: `/api/Material/getAllMaterial`,
    method: "GET",
  });
};
const createManyUseMaterial = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/UseMaterial/createManyUseMaterial",
    method: "POST",
    data,
  });
};
const deleteAllUseMaterialByIdProduct = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/UseMaterial/deleteManyUseMaterialByIdProduct/${Id}`,
    method: "DELETE",
  });
};
export const materialService = {
  getAllMaterial,
  createManyUseMaterial,
  deleteAllUseMaterialByIdProduct,
};
