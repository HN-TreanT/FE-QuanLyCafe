import createApiServices from "../createApiService";
const api = createApiServices();
const GetTop5Product = (time: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/getBestSellProduct/${time}`,
    method: "GET",
  });
};
const GetAllProduct = (
  selectedPage: Number,
  searchValue: any,
  typeSearch: any,
  pageSize: Number
) => {
  if (!searchValue) {
    searchValue = "";
  }
  if (!typeSearch) {
    typeSearch = "";
  }
  return api.makeAuthRequest({
    // url: `https://localhost:7066/api/Product/getAllProduct?page=${selectedPage}&typeSearch=${typeSearch}&searchValue=${searchValue}&pageSize=${pageSize}`,
    url: `/api/Product/getAllProduct?page=${selectedPage}&typeSearch=${typeSearch}&searchValue=${searchValue}&pageSize=${pageSize}`,
    method: "GET",
  });
};
const GetAllProductByCategory = (
  page: Number,
  pageSize: Number,
  Id: string,
  searchValue: string
) => {
  if (!searchValue) {
    searchValue = "";
  }
  return api.makeAuthRequest({
    // url: `https://localhost:7066/api/Product/getAllProductByCategory?page=${page}&pageSize=${pageSize}&Id=${Id}&searchValue=${searchValue}`,
    url: `/api/Product/getAllProductByCategory?page=${page}&pageSize=${pageSize}&Id=${Id}&searchValue=${searchValue}`,
    method: "GET",
  });
};
const CreateProduct = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/Product/createProduct",
    method: "POST",
    data: data,
  });
};
const DeleteProduct = (IdProduct: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/deleteProduct/${IdProduct}`,
    method: "DELETE",
  });
};
const GetProductById = (Id: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/getProductById/${Id}`,
    method: "GET",
  });
};
const updateProduct = (IdProduct: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/updateProduct/${IdProduct}`,
    method: "PUT",
    data,
  });
};
export const productServices = {
  GetTop5Product,
  GetAllProduct,
  CreateProduct,
  DeleteProduct,
  GetProductById,
  updateProduct,
  GetAllProductByCategory,
};
