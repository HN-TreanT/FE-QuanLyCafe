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
const createOrderDetail = (data: any) => {
  return api.makeAuthRequest({
    url: "/api/OrderDetails/createOrderDetail",
    method: "POST",
    data,
  });
};
const updateOrderDetail = (IdOrderDetail: string, data: any) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/updateOrderDt/${IdOrderDetail}`,
    method: "PUT",
    data,
  });
};
const deleteOrderDetail = (IdOrderDetail: string) => {
  return api.makeAuthRequest({
    url: `/api/OrderDetails/deleteOrderDt/${IdOrderDetail}`,
    method: "DELETE",
  });
};
export const orderDetailServices = {
  handleGetOrderByIdOrder,
  getOrderDetailById,
  createListOrderDetail,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
};
