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

const createMaterial = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/Material/createMaterial`,
    method: "POST",
    data,
  });
};
const deleteMaterial = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Material/deleteMaterial/${Id}`,
    method: "DELETE",
  });
};
const updateMaterial = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Material/updateMaterial/${Id}`,
    method: "PUT",
    data,
  });
};
export const materialService = {
  getAllMaterial,
  createManyUseMaterial,
  deleteAllUseMaterialByIdProduct,
  createMaterial,
  deleteMaterial,
  updateMaterial,
};
