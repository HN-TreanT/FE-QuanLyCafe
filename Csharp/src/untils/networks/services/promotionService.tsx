import createApiServices from "../createApiService";
const api = createApiServices();
const GetPromotionExpired = () => {
  return api.makeAuthRequest({
    url: "/api/Promotion/getPromotionExpired",
    method: "GET",
  });
};
export const promotionServices = {
  GetPromotionExpired,
};
