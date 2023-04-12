import createApiServices from "../createApiService";
const api = createApiServices();
const GetTop5Product = (time: any) => {
  return api.makeAuthRequest({
    url: `/api/Product/getBestSellProduct/${time}`,
    method: "GET",
  });
};
export const productServices = {
  GetTop5Product,
};
