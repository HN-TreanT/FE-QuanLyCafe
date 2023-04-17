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
export const productServices = {
  GetTop5Product,
  GetAllProduct,
  CreateProduct,
  DeleteProduct,
};