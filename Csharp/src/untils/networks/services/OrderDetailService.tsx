import createApiServices from "../createApiService";
const api = createApiServices();
const handleGetOrderByIdOrder = (IdOrder: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getAllOrderByIdOrder/${IdOrder}`,
    method: "GET",
  });
};
const getOrderDetailById = (IdOrder: string) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/getOrderDtById/${IdOrder}`,
    method: "GET",
  });
};
const createListOrderDetail = (data: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/createListOrderDt`,
    method: "POST",
    data,
  });
};
export const orderDetailServices = {
  handleGetOrderByIdOrder,
  getOrderDetailById,
  createListOrderDetail,
};
