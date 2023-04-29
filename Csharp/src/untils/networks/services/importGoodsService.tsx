import createApiServices from "../createApiService";
const api = createApiServices();
const getAllImportGoods = (page: Number) => {
  return api.makeAuthRequest({
    url: `/api/ImportGoods/getAllImportGood?page=${page}`,
    method: "GET",
  });
};
const getDetailImportGoods = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/ImportGoods/getImportGoodDt/${Id}`,
    method: "GET",
  });
};
const createImportGoods = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/ImportGoods/createImportGoods",
    method: "POST",
    data,
  });
};
const updateImportGood = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/ImportGoods/updateImportGoods/${Id}`,
    method: "PUT",
    data,
  });
};

const deleteImportGood = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/ImportGoods/deleteImportGoods/${Id}`,
    method: "DELETE",
  });
};
const createListImportGoods = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/ImportGoods/createManyImportGoods",
    method: "POST",
    data,
  });
};
export const importGoodService = {
  getAllImportGoods,
  getDetailImportGoods,
  createImportGoods,
  updateImportGood,
  deleteImportGood,
  createListImportGoods,
};
