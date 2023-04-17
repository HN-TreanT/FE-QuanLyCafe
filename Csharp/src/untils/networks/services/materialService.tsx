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
export const materialService = {
  getAllMaterial,
  createManyUseMaterial,
};
