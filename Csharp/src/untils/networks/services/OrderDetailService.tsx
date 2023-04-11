import createApiServices from "../createApiService";
const api = createApiServices();
const handleGetOverview = (time: Number) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getOverview/${time}`,
    method: "GET",
  });
};
export const authService = {};
