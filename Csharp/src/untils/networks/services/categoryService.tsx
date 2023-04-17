import createApiServices from "../createApiService";
const api = createApiServices();
const getAllCategories = () => {
  return api.makeAuthRequest({
    url: "/api/Category/getAllCategory",
    method: "GET",
  });
};
export const categoryService = { getAllCategories };
