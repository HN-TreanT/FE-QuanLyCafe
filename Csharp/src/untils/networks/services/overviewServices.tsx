import createApiServices from "../createApiService";
const api = createApiServices();
const handleGetOverview = (time: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getOverview/${time}`,
    method: "GET",
  });
};
export const overviewService = {
  handleGetOverview,
};
