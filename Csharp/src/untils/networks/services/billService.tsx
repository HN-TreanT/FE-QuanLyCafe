import createApiServices from "../createApiService";
const api = createApiServices();
const getOrder = (data: any) => {
  return api.makeAuthRequest({
    url: `api/Order/${data}`,
    method: "GET",
  });
};
export const billServices = { getOrder };
