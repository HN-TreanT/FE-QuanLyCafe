import createApiServices from "../createApiService";
const api = createApiServices();
const handleGetOrderByIdOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getAllOrderByIdOrder/${IdOrder}`,
    method: "GET",
  });
};
export const orderDetailServices = {
  handleGetOrderByIdOrder,
};
