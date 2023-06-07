import createApiServices from "../createApiService";
const api = createApiServices();
const getAllImportGoods = (page: Number, timeStart: string, timeEnd: string) => {
  return api.makeAuthRequest({
    // url: `https://localhost:7066/api/ImportGoods/getAllImportGood?page=${page}&timeStart=${timeStart}&timeEnd=${timeEnd}`,
    url: `/api/ImportGoods/getAllImportGood?page=${page}&timeStart=${timeStart}&timeEnd=${timeEnd}`,
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
