import createApiServices from "../createApiService";
const api = createApiServices();
const GetTop5Product = (time: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/getBestSellProduct/${time}`,
    method: "GET",
  });
};
const GetAllProduct = () => {
  return api.makeAuthRequest({
    url: "/api/Product/getAllProduct",
    method: "GET",
  });
};
const GetAllProductByCategory = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Product/getAllProductByCategory/${Id}`,
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
