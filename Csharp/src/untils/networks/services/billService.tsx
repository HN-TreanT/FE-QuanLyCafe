import createApiServices from "../createApiService";
const api = createApiServices();

const getAllOrder = (selectedStateBill: string, page: Number) => {
  return api.makeAuthRequest({
    url: `/api/Order/${selectedStateBill}?page=${page}`,
    method: "GET",
  });
};

const deleteOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/Order/deleteOrder/${IdOrder}`,
    method: "DELETE",
  });
};
export const billServices = { getAllOrder, deleteOrder };
