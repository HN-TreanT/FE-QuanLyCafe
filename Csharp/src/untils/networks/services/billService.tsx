import createApiServices from "../createApiService";
const api = createApiServices();
const getOrder = (data: any) => {
  return api.makeAuthRequest({
    url: `api/Order/${data}`,
    method: "GET",
  });
};

const deleteOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/deleteOrder/${IdOrder}`,
    method: "DELETE",
  });
};
export const billServices = { getOrder, deleteOrder };
