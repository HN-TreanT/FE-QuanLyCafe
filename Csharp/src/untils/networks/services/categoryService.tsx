import createApiServices from "../createApiService";
const api = createApiServices();
const getAllCategories = () => {
  return api.makeAuthRequest({
    url: "/api/Category/getAllCategory",
    method: "GET",
  });
};
const getCateroryById = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Category/getCategoryById/${Id}`,
    method: "GET",
  });
};
const createCategory = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/Category/createCategory",
    method: "POST",
    data,
  });
};
const updateCategory = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Category/updateCategory${Id}`,
    method: "PUT",
    data,
  });
};
const deleteCategory = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Category/deleteCategory${Id}`,
    method: "DELETE",
  });
};
export const categoryService = {
  getAllCategories,
  getCateroryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
