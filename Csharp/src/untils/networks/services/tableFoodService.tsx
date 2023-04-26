import createApiServices from "../createApiService";
const api = createApiServices();
const getAllTableFood = () => {
  return api.makeAuthRequest({
    url: "/api/TableFood/getAllTableFood",
    method: "GET",
  });
};
const getTableFoodById = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/TableFood/getTableFoodDetail/${Id}`,
  });
};
const createTableFood = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/TableFood/createTableFood",
    method: "POST",
    data,
  });
};
const updateTabelFodd = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/TableFood/updateTablefood/${Id}`,
    method: "PUT",
    data,
  });
};
const deleteTableFood = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/TableFood/deleteTableFood/${Id}`,
    method: "DELETE",
  });
};
export const tableFoodService = {
  getAllTableFood,
  getTableFoodById,
  createTableFood,
  updateTabelFodd,
  deleteTableFood,
};
