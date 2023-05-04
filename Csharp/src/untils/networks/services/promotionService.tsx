import createApiServices from "../createApiService";
const api = createApiServices();
const GetPromotionExpired = () => {
  return api.makeAuthRequest({
    url: "/api/Promotion/getPromotionExpired",
    method: "GET",
  });
};
const GetAllPromotion = () => {
  return api.makeAuthRequest({
    url: "/api/Promotion/getAllPromotion",
    method: "GET",
  });
};

const deletePromotion = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Promotion/deletePromotion/${Id}`,
    method: "DELETE",
  });
};
const createPromotion = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/Promotion/createPromotion`,
    method: "POST",
    data,
  });
};
const updatePromotion = (Id: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/Promotion/updatePromotion/${Id}`,
    method: "PUT",
    data,
  });
};
const getPromotionId = (Id: string) => {
  return api.makeAuthRequest({
    url: `/api/Promotion/getPromotionById/${Id}`,
    method: "GET",
  });
};
export const promotionServices = {
  GetPromotionExpired,
  GetAllPromotion,
  deletePromotion,
  createPromotion,
  updatePromotion,
  getPromotionId,
};
