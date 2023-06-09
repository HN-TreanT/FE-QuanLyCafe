import createApiServices from "../createApiService";
const api = createApiServices();
const handleGetOverview = (time: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getOverview/${time}`,
    method: "GET",
  });
};
const getRevenueOverview = () => {
  return api.makeAuthRequest({
    url: "/api/OrderDetails/revenueOverview",
    method: "GET",
  });
};
export const overviewService = {
  handleGetOverview,
  getRevenueOverview,
};
